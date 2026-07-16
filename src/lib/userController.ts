import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { verifyAccessToken } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function getUserProfile(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: Bearer token required' },
        { status: 401 }
      );
    }

    const accessToken = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or expired access token' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        licenses: {
          orderBy: { expiresAt: 'desc' },
        },
        devices: {
          orderBy: { lastActiveAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const activeLicense = user.licenses.find(l => l.status === 'ACTIVE' && l.expiresAt > new Date()) || user.licenses[0] || null;
    const activeDevices = user.devices.filter(d => d.isActive);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
      license: activeLicense
        ? {
            id: activeLicense.id,
            tier: activeLicense.tier,
            status: activeLicense.status,
            expiresAt: activeLicense.expiresAt,
            gracePeriodDays: activeLicense.gracePeriodDays,
            maxDevices: activeLicense.maxDevices,
            features: activeLicense.features,
          }
        : null,
      devices: activeDevices.map(d => ({
        id: d.id,
        deviceId: d.deviceId,
        deviceName: d.deviceName,
        os: d.os,
        appVersion: d.appVersion,
        lastActiveAt: d.lastActiveAt,
        isActive: d.isActive,
      })),
      devicesSummary: {
        activeCount: activeDevices.length,
        maxDevices: activeLicense ? activeLicense.maxDevices : 0,
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching profile' },
      { status: 500 }
    );
  }
}

export async function deleteUserProfile(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await logAudit('ACCOUNT_DELETED', user.id, `User ${user.email} requested account deletion (GDPR Right to Erasure)`);

    // Cascade deletion of user, licenses, devices, sessions, tokens
    await prisma.user.delete({
      where: { id: user.id },
    });

    return NextResponse.json({ success: true, message: 'Account and all portal data deleted successfully under GDPR Right to Erasure' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Internal server error during account deletion' }, { status: 500 });
  }
}
