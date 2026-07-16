import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { refreshToken, deviceId } = body;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Verify token structure/signature first
    const payload = await verifyRefreshToken(refreshToken);
    const tokenHash = hashToken(refreshToken);

    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    // If token exists but is revoked, or payload invalid after discovery, revoke family/device tokens
    if (storedToken && storedToken.isRevoked) {
      // Security precaution: revoke all tokens for this deviceId or userId
      const targetDeviceId = deviceId || storedToken.deviceId;
      if (targetDeviceId) {
        await prisma.refreshToken.updateMany({
          where: {
            userId: storedToken.userId,
            deviceId: targetDeviceId,
            isRevoked: false,
          },
          data: { isRevoked: true },
        });
      } else {
        await prisma.refreshToken.updateMany({
          where: {
            userId: storedToken.userId,
            isRevoked: false,
          },
          data: { isRevoked: true },
        });
      }
      return NextResponse.json(
        { error: 'Refresh token has been revoked. Security violation detected.' },
        { status: 401 }
      );
    }

    if (!payload || !storedToken || storedToken.expiresAt <= new Date()) {
      return NextResponse.json(
        { error: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Rotate refresh token
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { isRevoked: true },
    });

    const targetDeviceId = deviceId || storedToken.deviceId || undefined;

    // Issue new access and refresh token pair
    const newAccessToken = await signAccessToken({
      userId: storedToken.user.id,
      email: storedToken.user.email,
      role: storedToken.user.role,
    });

    const { token: newRefreshToken, expiresAt, tokenHash: newTokenHash } = await signRefreshToken({
      userId: storedToken.user.id,
      deviceId: targetDeviceId,
    });

    await prisma.refreshToken.create({
      data: {
        tokenHash: newTokenHash,
        userId: storedToken.user.id,
        deviceId: targetDeviceId || null,
        expiresAt,
        isRevoked: false,
      },
    });

    // Update Device.lastActiveAt if targetDeviceId is present
    if (targetDeviceId) {
      await prisma.device.updateMany({
        where: {
          deviceId: targetDeviceId,
          userId: storedToken.user.id,
        },
        data: {
          lastActiveAt: new Date(),
          isActive: true,
        },
      });
    }

    return NextResponse.json({
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: 900,
      },
    });
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error during token refresh' },
      { status: 500 }
    );
  }
}
