import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { signLicenseProof } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, deviceId } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
    }

    // Find user by email
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
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const activeLicense = user.licenses[0];

    // Check if license exists and is not expired
    if (!activeLicense || activeLicense.expiresAt <= new Date()) {
      return NextResponse.json({
        success: false,
        code: 'LICENSE_EXPIRED',
        error: activeLicense
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
      deviceId: deviceId || 'desktop-sync',
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
    console.error('[SyncLicense] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during sync' },
      { status: 500 }
    );
  }
}
