import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { Webhook } from 'svix';

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string; id: string }>;
    first_name?: string;
    last_name?: string;
    primary_email_address_id?: string;
  };
}

export async function POST(request: Request) {
  if (!WEBHOOK_SECRET) {
    console.error('[Clerk Webhook] CLERK_WEBHOOK_SECRET is not configured.');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  // Verify webhook signature (Svix)
  const headerPayload = request.headers;
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { error: 'Missing Svix headers' },
      { status: 400 }
    );
  }

  const body = await request.text();

  let event: ClerkWebhookEvent;
  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    event = (wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as unknown) as ClerkWebhookEvent;
  } catch (err) {
    console.error('[Clerk Webhook] Verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 400 }
    );
  }

  // Handle events
  try {
    switch (event.type) {
      case 'user.created': {
        const clerkUserId = event.data.id;
        const primaryEmailId = event.data.primary_email_address_id;
        const emailObj = event.data.email_addresses?.find(
          (e) => e.id === primaryEmailId
        ) || event.data.email_addresses?.[0];
        const email = emailObj?.email_address;

        if (!email) {
          console.error('[Clerk Webhook] user.created: no email found');
          return NextResponse.json({ error: 'No email in payload' }, { status: 400 });
        }

        const name = [event.data.first_name, event.data.last_name]
          .filter(Boolean)
          .join(' ') || null;

        // Check if user already exists (e.g., created via legacy register endpoint)
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { clerkUserId },
              { email },
            ],
          },
        });

        if (existingUser) {
          // Link Clerk ID to existing user
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { clerkUserId, name: name || existingUser.name },
          });
          console.log(`[Clerk Webhook] Linked Clerk user ${clerkUserId} to existing user ${existingUser.email}`);
        } else {
          // Create new user with 7-day PROFESSIONAL trial
          const trialExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

          await prisma.user.create({
            data: {
              clerkUserId,
              email,
              name,
              role: 'USER',
              licenses: {
                create: {
                  tier: 'PROFESSIONAL',
                  status: 'ACTIVE',
                  expiresAt: trialExpiresAt,
                  gracePeriodDays: 7,
                  maxDevices: 3,
                  features: [
                    'unlimited_patients',
                    'export_pdf',
                    'icd10_search',
                    'local_storage',
                  ],
                },
              },
            },
          });
          console.log(`[Clerk Webhook] Created user ${email} with 7-day trial`);
        }
        break;
      }

      case 'user.updated': {
        const clerkUserId = event.data.id;
        const primaryEmailId = event.data.primary_email_address_id;
        const emailObj = event.data.email_addresses?.find(
          (e) => e.id === primaryEmailId
        ) || event.data.email_addresses?.[0];
        const email = emailObj?.email_address;
        const name = [event.data.first_name, event.data.last_name]
          .filter(Boolean)
          .join(' ') || null;

        const user = await prisma.user.findUnique({ where: { clerkUserId } });
        if (user) {
          await prisma.user.update({
            where: { clerkUserId },
            data: {
              ...(email && { email }),
              ...(name && { name }),
            },
          });
        }
        break;
      }

      case 'user.deleted': {
        const clerkUserId = event.data.id;
        const user = await prisma.user.findUnique({ where: { clerkUserId } });
        if (user) {
          await prisma.user.delete({ where: { id: user.id } });
          console.log(`[Clerk Webhook] Deleted user ${user.email}`);
        }
        break;
      }

      default:
        console.log(`[Clerk Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Clerk Webhook] Processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
