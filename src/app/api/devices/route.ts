import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { verifyAccessToken } from '@/lib/auth';

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

    const devices = await prisma.device.findMany({
      where: {
        userId: payload.userId,
      },
      orderBy: {
        lastActiveAt: 'desc',
      },
    });

    return NextResponse.json({
      devices: devices.map(d => ({
        id: d.id,
        deviceId: d.deviceId,
        deviceName: d.deviceName,
        os: d.os,
        appVersion: d.appVersion,
        lastActiveAt: d.lastActiveAt,
        isActive: d.isActive,
        createdAt: d.createdAt,
      })),
    });
  } catch (error) {
    console.error('Get devices error:', error);
    return NextResponse.json(
      { error: 'Internal server error while listing devices' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
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
    const id = url.searchParams.get('id');
    const deviceId = url.searchParams.get('deviceId');

    let body = {};
    if (!id && !deviceId) {
      body = await request.json().catch(() => ({}));
    }
    const targetId = id || (body as { id?: string }).id;
    const targetDeviceId = deviceId || (body as { deviceId?: string }).deviceId;

    if (!targetId && !targetDeviceId) {
      return NextResponse.json(
        { error: 'Device id or deviceId query parameter/body required' },
        { status: 400 }
      );
    }

    const device = await prisma.device.findFirst({
      where: targetId
        ? { id: targetId, userId: payload.userId }
        : { deviceId: targetDeviceId, userId: payload.userId },
    });

    if (!device) {
      return NextResponse.json(
        { error: 'Device not found or unauthorized' },
        { status: 404 }
      );
    }

    // Set isActive to false and revoke associated refresh tokens
    await prisma.device.update({
      where: { id: device.id },
      data: { isActive: false },
    });

    await prisma.refreshToken.updateMany({
      where: {
        userId: payload.userId,
        deviceId: device.deviceId,
      },
      data: {
        isRevoked: true,
      },
    });

    return NextResponse.json({ success: true, message: 'Device deactivated and tokens revoked' });
  } catch (error) {
    console.error('Delete device error:', error);
    return NextResponse.json(
      { error: 'Internal server error while deactivating device' },
      { status: 500 }
    );
  }
}
