import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { signLicenseProof } from '@/lib/auth';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    // Verify Clerk session
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { error: 'Unauthorized: Clerk session required' },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const deviceId = body.deviceId || 'desktop-device';

    // Find user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      include: {
        licenses: {
          where: { status: 'ACTIVE' },
          orderBy: { expiresAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found in license database' },
        { status: 404 }
      );
    }

    const activeLicense = user.licenses[0];

    // Check if license exists and is not expired
    if (!activeLicense || activeLicense.expiresAt <= new Date()) {
      return NextResponse.json({
        success: false,
        code: 'LICENSE_EXPIRED',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        license: null,
        reason: activeLicense
          ? 'Twoja licencja wygasła. Wykup subskrypcję, aby kontynuować.'
          : 'Brak aktywnej licencji. Wykup subskrypcję.',
      });
    }

    // Generate cryptographically signed license proof for the desktop app
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
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      license: {
        id: activeLicense.id,
        tier: activeLicense.tier,
        status: activeLicense.status,
        expiresAt: activeLicense.expiresAt.toISOString(),
        gracePeriodDays: activeLicense.gracePeriodDays,
        features: activeLicense.features,
        signedProof,
      },
    });
  } catch (error) {
    console.error('[Activate] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error during activation' },
      { status: 500 }
    );
  }
}
