import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { hashToken, verifyAccessToken } from '@/lib/auth';

export async function POST(request: Request) {
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

    const body = await request.json().catch(() => ({}));
    const { refreshToken } = body;

    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      await prisma.refreshToken.updateMany({
        where: {
          tokenHash,
          userId: payload.userId,
        },
        data: {
          isRevoked: true,
        },
      });
    } else {
      // If no specific refreshToken given, we could optionally revoke all for user or just succeed
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error during logout' },
      { status: 500 }
    );
  }
}
