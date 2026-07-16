import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { verifyAccessToken, signLicenseProof } from '@/lib/auth';

export async function GET(request: Request) {
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

    const url = new URL(request.url);
    const deviceId = url.searchParams.get('deviceId') || 'unknown-device';

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        licenses: {
          where: { status: 'ACTIVE' },
          orderBy: { expiresAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const activeLicense = user.licenses[0];
    if (!activeLicense || activeLicense.expiresAt <= new Date()) {
      return NextResponse.json(
        {
          error: 'No active license found',
          code: 'LICENSE_EXPIRED',
          license: null,
        },
        { status: 403 }
      );
    }

    // Check device concurrency against maxDevices
    const activeDevicesCount = await prisma.device.count({
      where: {
        userId: user.id,
        isActive: true,
      },
    });

    const isConcurrencyExceeded = activeDevicesCount > activeLicense.maxDevices;

    const signedProof = await signLicenseProof({
      id: activeLicense.id,
      tier: activeLicense.tier,
      status: activeLicense.status,
      expiresAt: activeLicense.expiresAt,
      features: activeLicense.features,
      deviceId,
      signedAt: new Date(),
    });

    return NextResponse.json({
      license: {
        id: activeLicense.id,
        tier: activeLicense.tier,
        status: activeLicense.status,
        expiresAt: activeLicense.expiresAt,
        gracePeriodDays: activeLicense.gracePeriodDays,
        maxDevices: activeLicense.maxDevices,
        features: activeLicense.features,
        signedProof,
      },
      concurrency: {
        activeDevicesCount,
        maxDevices: activeLicense.maxDevices,
        exceeded: isConcurrencyExceeded,
      },
    });
  } catch (error) {
    console.error('Get license error:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching license' },
      { status: 500 }
    );
  }
}
