import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { Environment, Paddle } from '@paddle/paddle-node-sdk';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('paddle-signature');
    const secret = process.env.PADDLE_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }

    const body = await request.text();

    const paddle = new Paddle(process.env.PADDLE_API_KEY || '', {
      environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'sandbox' 
        ? Environment.sandbox 
        : Environment.production,
    });

    // Verify signature
    let eventData;
    try {
      eventData = await paddle.webhooks.unmarshal(body, secret, signature);
    } catch (e) {
      console.error('Failed to verify Paddle webhook signature:', e);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Process event
    if (eventData) {
      const eventType = eventData.eventType;
      console.log(`[Paddle Webhook] Received event: ${eventType}`);

      switch (eventType) {
        case 'subscription.created':
        case 'subscription.updated':
        case 'subscription.activated':
        case 'subscription.resumed': {
          const subscription = eventData.data;
          // The userId was passed in customData during checkout
          const userId = subscription.customData?.userId as string | undefined;

          if (!userId) {
            console.error('[Paddle Webhook] Missing userId in customData');
            return NextResponse.json({ received: true });
          }

          const customerId = subscription.customerId;
          const subscriptionId = subscription.id;
          
          // Determine status
          const paddleStatus = subscription.status;
          let newStatus: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'SUSPENDED' = 'ACTIVE';
          
          if (paddleStatus === 'canceled') newStatus = 'CANCELLED';
          if (paddleStatus === 'past_due' || paddleStatus === 'paused') newStatus = 'SUSPENDED';
          
          // Determine expiration date
          let expiresAt = new Date();
          if (subscription.currentBillingPeriod?.endsAt) {
            expiresAt = new Date(subscription.currentBillingPeriod.endsAt);
            expiresAt.setDate(expiresAt.getDate() + 2); 
          }

          // Determine tier based on Price ID or Product ID
          let tier: 'STANDARD' | 'PROFESSIONAL' = 'PROFESSIONAL';
          
          // Using the price IDs we set up:
          // Starter (STANDARD): pri_01m1xpv6seqh7pgrfn7fnzwxd8, pri_01m1xpt3fz6xydh9jgg9wyk3q8
          // Pro (PROFESSIONAL): pri_01m1xpxgr7hb51sj2g4yamkdgz, pri_01m1xpwrk0p57ff3cetavx334w
          const items = subscription.items;
          if (items && items.length > 0) {
            const priceId = items[0].price?.id;
            if (
              priceId === 'pri_01m1xpv6seqh7pgrfn7fnzwxd8' || 
              priceId === 'pri_01m1xpt3fz6xydh9jgg9wyk3q8'
            ) {
              tier = 'STANDARD';
            }
          }

          // Update user's license
          await prisma.license.updateMany({
            where: { userId },
            data: {
              paymentProvider: 'PADDLE',
              providerCustomerId: customerId,
              providerSubscriptionId: subscriptionId,
              status: newStatus,
              tier,
              expiresAt,
            },
          });

          console.log(`[Paddle Webhook] Updated license for user ${userId}. Status: ${newStatus}, Expires: ${expiresAt}`);
          break;
        }

        case 'subscription.canceled': {
          const subscription = eventData.data;
          const subscriptionId = subscription.id;

          await prisma.license.updateMany({
            where: { providerSubscriptionId: subscriptionId },
            data: {
              status: 'CANCELLED',
            },
          });
          console.log(`[Paddle Webhook] Cancelled license for subscription ${subscriptionId}`);
          break;
        }

        default:
          console.log(`[Paddle Webhook] Unhandled event type: ${eventType}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Paddle Webhook] Processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
