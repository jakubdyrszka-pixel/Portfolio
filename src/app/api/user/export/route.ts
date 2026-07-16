import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { verifyAccessToken } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Bearer token required' }, { status: 401 });
    }

    const accessToken = authHeader.split(' ')[1];
    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized: Invalid or expired access token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        licenses: true,
        devices: true,
        sessions: {
          select: {
            id: true,
            expiresAt: true,
            ipAddress: true,
            userAgent: true,
            createdAt: true,
          },
        },
        auditLogs: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await logAudit('DATA_EXPORTED', user.id, `User ${user.email} exported complete portal data package (GDPR Art. 20)`);

    const exportData = {
      exportMetadata: {
        exportedAt: new Date().toISOString(),
        system: 'jakubdyrszka.dev (PhysioNotes Portal SaaS)',
        dataController: 'Jakub Dyrszka (jakubdyrszka.dev)',
        gdprLegalBasis: 'Art. 20 GDPR (Right to Data Portability)',
        note: 'This package contains only account, license, and device telemetry data stored on the portal. Medical records and patient notes are stored strictly locally on the therapist device (Zero-Knowledge architecture).'
      },
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      licenses: user.licenses,
      devices: user.devices,
      activeSessions: user.sessions,
      auditHistory: user.auditLogs,
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="physionotes-gdpr-export-${user.id}.json"`,
      },
    });
  } catch (error) {
    console.error('Export user data error:', error);
    return NextResponse.json({ error: 'Internal server error during data export' }, { status: 500 });
  }
}
