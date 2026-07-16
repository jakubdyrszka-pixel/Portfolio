import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { verifyPassword, signAccessToken, signRefreshToken, signLicenseProof } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, deviceId, deviceName, os, appVersion } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // 1. Verify credentials
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        licenses: {
          where: { status: 'ACTIVE' },
          orderBy: { expiresAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 2. Check active license
    const activeLicense = user.licenses[0];
    if (!activeLicense || activeLicense.expiresAt <= new Date()) {
      return NextResponse.json(
        {
          error: 'No active or valid license found for user',
          code: 'LICENSE_EXPIRED',
        },
        { status: 403 }
      );
    }

    // 3. Check Device binding (if deviceId is provided, e.g. from desktop app or specific device)
    if (deviceId) {
      const existingDevice = await prisma.device.findUnique({
        where: { deviceId },
      });

      if (existingDevice && existingDevice.userId === user.id) {
        await prisma.device.update({
          where: { deviceId },
          data: {
            lastActiveAt: new Date(),
            appVersion: appVersion || existingDevice.appVersion,
            os: os || existingDevice.os,
            deviceName: deviceName || existingDevice.deviceName,
            isActive: true,
            licenseId: activeLicense.id,
          },
        });
      } else {
        // New device for user: check active devices count vs maxDevices
        const activeDevicesCount = await prisma.device.count({
          where: {
            userId: user.id,
            isActive: true,
          },
        });

        if (activeDevicesCount >= activeLicense.maxDevices) {
          return NextResponse.json(
            {
              error: `Maximum active devices limit (${activeLicense.maxDevices}) exceeded`,
              code: 'MAX_DEVICES_EXCEEDED',
            },
            { status: 403 }
          );
        }

        await prisma.device.create({
          data: {
            userId: user.id,
            licenseId: activeLicense.id,
            deviceId,
            deviceName: deviceName || 'Unknown Device',
            os: os || 'Unknown OS',
            appVersion: appVersion || '1.0.0',
            isActive: true,
            lastActiveAt: new Date(),
          },
        });
      }
    }

    // 4. Generate tokens
    const accessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const { token: refreshToken, expiresAt, tokenHash } = await signRefreshToken({
      userId: user.id,
      deviceId: deviceId || undefined,
    });

    // Store refresh token hash in DB
    await prisma.refreshToken.create({
      data: {
        tokenHash,
        userId: user.id,
        deviceId: deviceId || null,
        expiresAt,
        isRevoked: false,
      },
    });

    // 5. Generate signed license proof
    const signedProof = await signLicenseProof({
      id: activeLicense.id,
      tier: activeLicense.tier,
      status: activeLicense.status,
      expiresAt: activeLicense.expiresAt,
      features: activeLicense.features,
      deviceId: deviceId || 'web-session',
      signedAt: new Date(),
    });

    // Log login audit event
    await logAudit('LOGIN', user.id, `Successful login from device: ${deviceName || deviceId || 'web-session'}`);

    // 6. Return payload matching contract
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: 900, // 15 minutes
      },
      license: {
        id: activeLicense.id,
        tier: activeLicense.tier,
        status: activeLicense.status,
        expiresAt: activeLicense.expiresAt,
        gracePeriodDays: activeLicense.gracePeriodDays,
        features: activeLicense.features,
        signedProof,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during login' },
      { status: 500 }
    );
  }
}
