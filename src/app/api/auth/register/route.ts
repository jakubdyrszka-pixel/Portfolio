import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Create user along with default 30-day PROFESSIONAL license
    const trialExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days free Professional
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || null,
        role: 'USER',
        licenses: {
          create: {
            tier: 'PROFESSIONAL',
            status: 'ACTIVE',
            expiresAt: trialExpiresAt,
            gracePeriodDays: 30,
            maxDevices: 3,
            features: ['unlimited_patients', 'cloud_backup', 'export_pdf', 'icd10_search', 'local_storage'],
          },
        },
      },
      include: {
        licenses: true,
      },
    });

    const activeLicense = user.licenses[0];

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        license: activeLicense
          ? {
              id: activeLicense.id,
              tier: activeLicense.tier,
              status: activeLicense.status,
              expiresAt: activeLicense.expiresAt,
              gracePeriodDays: activeLicense.gracePeriodDays,
              features: activeLicense.features,
            }
          : null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error during registration' },
      { status: 500 }
    );
  }
}
