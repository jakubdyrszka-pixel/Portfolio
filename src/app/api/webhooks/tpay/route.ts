import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // Tpay webhook usually sends data as application/x-www-form-urlencoded
    const text = await request.text();
    const params = new URLSearchParams(text);

    const tr_id = params.get('tr_id');
    const tr_date = params.get('tr_date');
    const tr_crc = params.get('tr_crc'); // We will pass userId here
    const tr_amount = params.get('tr_amount');
    const tr_paid = params.get('tr_paid');
    const tr_desc = params.get('tr_desc');
    const tr_status = params.get('tr_status');
    const tr_error = params.get('tr_error');
    const tr_email = params.get('tr_email');
    const md5sum = params.get('md5sum');

    // Weryfikacja podpisu Tpay
    const idSeller = process.env.TPAY_ID;
    const securityCode = process.env.TPAY_SECURITY_CODE;

    if (!idSeller || !securityCode) {
      console.warn('[Tpay Webhook] Brak konfiguracji TPAY_ID lub TPAY_SECURITY_CODE');
    }

    if (idSeller && securityCode && tr_id && tr_amount && tr_crc) {
      const checkStr = `${idSeller}${tr_id}${tr_amount}${tr_crc}${securityCode}`;
      const hash = crypto.createHash('md5').update(checkStr).digest('hex');
      
      if (hash !== md5sum) {
        console.error('[Tpay Webhook] Invalid md5sum signature');
        return new Response('TRUE', { status: 400 }); // Tpay wymaga odpowiedzi "TRUE" lub "FALSE"
      }
    }

    if (tr_status === 'TRUE' && tr_crc) {
      // W tr_crc przechowujemy userId lub format 'userId:tier'
      // Dla uproszczenia załóżmy, że tr_crc to po prostu userId
      const userId = tr_crc;
      let tier: 'STANDARD' | 'PROFESSIONAL' = 'PROFESSIONAL'; // domyślnie Pro
      
      if (tr_desc && tr_desc.toLowerCase().includes('starter')) {
        tier = 'STANDARD';
      }

      // Przyznanie licencji na np. 30 dni od teraz (zakładamy płatność jednorazową lub odnowienie)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 31); // +31 dni

      console.log(`[Tpay Webhook] Przyznawanie licencji dla usera ${userId}, tier: ${tier}`);

      // Szukamy istniejącej licencji usera
      const existingLicenses = await prisma.license.findMany({
        where: { userId }
      });

      if (existingLicenses.length > 0) {
        await prisma.license.updateMany({
          where: { userId },
          data: {
            paymentProvider: 'TPAY',
            providerCustomerId: tr_email || '',
            providerSubscriptionId: tr_id || '',
            status: 'ACTIVE',
            tier,
            expiresAt,
          },
        });
      } else {
        await prisma.license.create({
          data: {
            userId,
            paymentProvider: 'TPAY',
            providerCustomerId: tr_email || '',
            providerSubscriptionId: tr_id || '',
            status: 'ACTIVE',
            tier,
            expiresAt,
          }
        });
      }
      
      return new Response('TRUE', { status: 200 });
    }

    // Odrzucenie / błąd
    if (tr_status === 'FALSE') {
      console.log(`[Tpay Webhook] Płatność odrzucona: ${tr_id}`);
      return new Response('TRUE', { status: 200 }); // Zwracamy TRUE, by Tpay przestał pingować
    }

    return new Response('TRUE', { status: 200 });
  } catch (error) {
    console.error('[Tpay Webhook] Processing error:', error);
    return new Response('FALSE', { status: 500 });
  }
}
