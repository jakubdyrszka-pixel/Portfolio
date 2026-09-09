import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
    const allowedIps = ['18.197.55.26', '3.126.108.86', '3.64.128.101', '18.184.99.42', '3.72.152.155', '35.159.7.168'];
    
    // Weryfikacja IP, z pominięciem w środowisku developerskim
    if (process.env.NODE_ENV === 'production' && ip && !allowedIps.some(allowed => ip.includes(allowed))) {
      console.error(`[HotPay Webhook] Unauthorized IP: ${ip}`);
      return new NextResponse('Unauthorized IP', { status: 403 });
    }

    const formData = await request.formData();
    const amount = formData.get('KWOTA') as string;
    const paymentId = formData.get('ID_PLATNOSCI') as string;
    const orderId = formData.get('ID_ZAMOWIENIA') as string;
    const status = formData.get('STATUS') as string;
    const secure = formData.get('SECURE') as string;
    const secret = formData.get('SEKRET') as string;
    const hash = formData.get('HASH') as string;
    
    const password = process.env.HOTPAY_PASSWORD || "";
    
    // hash("sha256", HASLO_Z_USTAWIEN.";".KWOTA.";".ID_PLATNOSCI.";".ID_ZAMOWIENIA.";".STATUS.";".SECURE.";".SEKRET)
    const hashString = `${password};${amount};${paymentId};${orderId};${status};${secure};${secret}`;
    const calculatedHash = crypto.createHash('sha256').update(hashString).digest('hex');
    
    if (calculatedHash !== hash) {
      console.error('[HotPay Webhook] Invalid signature');
      return new NextResponse('Invalid signature', { status: 400 });
    }

    if (status === 'SUCCESS') {
      // Decode orderId: userId|priceId|timestamp
      const parts = orderId.split('|');
      if (parts.length >= 2) {
        const clerkUserId = parts[0];
        const priceId = parts[1];

        // Fetch the user from database using clerkUserId
        const user = await prisma.user.findUnique({
          where: { clerkUserId }
        });

        if (!user) {
          console.error(`[HotPay Webhook] User not found for clerkUserId: ${clerkUserId}`);
          return new NextResponse('User not found', { status: 404 });
        }

        // Determine expiration date and tier
        const expiresAt = new Date();
        let tier: 'STANDARD' | 'PROFESSIONAL' = 'PROFESSIONAL';

        if (priceId === 'pri_01m1xpv6seqh7pgrfn7fnzwxd8') {
          // Starter 1 year
          tier = 'STANDARD';
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        } else if (priceId === 'pri_01m1xpt3fz6xydh9jgg9wyk3q8') {
          // Starter 1 month
          tier = 'STANDARD';
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        } else if (priceId === 'pri_01m1xpxgr7hb51sj2g4yamkdgz') {
          // Pro 1 year
          tier = 'PROFESSIONAL';
          expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        } else if (priceId === 'pri_01m1xpwrk0p57ff3cetavx334w') {
          // Pro 1 month
          tier = 'PROFESSIONAL';
          expiresAt.setMonth(expiresAt.getMonth() + 1);
        }

        // Add 2 days grace period
        expiresAt.setDate(expiresAt.getDate() + 2);

        // Update license based on the internal Prisma User ID
        await prisma.license.updateMany({
          where: { userId: user.id },
          data: {
            paymentProvider: 'HOTPAY',
            providerCustomerId: clerkUserId, 
            providerSubscriptionId: paymentId,
            status: 'ACTIVE',
            tier,
            expiresAt,
          },
        });
        
        console.log(`[HotPay Webhook] Activated license for user ${clerkUserId} (DB ID: ${user.id}). Tier: ${tier}, Expires: ${expiresAt}`);
      }
    }
    
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error("[HotPay Webhook] Processing error", error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
