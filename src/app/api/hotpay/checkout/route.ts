import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { priceId, email, userId } = await request.json();
    
    let amount = "49.00";
    let name = "PhysioNotes Starter (1 miesiąc)";
    
    // Using the same priceIds as defined in the pricing component
    if (priceId === 'pri_01m1xpt3fz6xydh9jgg9wyk3q8') {
      amount = "49.00";
      name = "PhysioNotes Starter (1 miesiąc)";
    } else if (priceId === 'pri_01m1xpv6seqh7pgrfn7fnzwxd8') {
      amount = "490.00";
      name = "PhysioNotes Starter (1 rok)";
    } else if (priceId === 'pri_01m1xpwrk0p57ff3cetavx334w') {
      amount = "79.00";
      name = "PhysioNotes Pro (1 miesiąc)";
    } else if (priceId === 'pri_01m1xpxgr7hb51sj2g4yamkdgz') {
      amount = "790.00";
      name = "PhysioNotes Pro (1 rok)";
    }
    
    const secret = process.env.HOTPAY_SECRET || "";
    const password = process.env.HOTPAY_PASSWORD || "";
    const orderId = `${userId}|${priceId}|${Date.now()}`;
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const returnUrl = `${protocol}://${host}/physionotes/activate`;
    
    const hashString = `${password};${amount};${name};${returnUrl};${orderId};${secret}`;
    const hash = crypto.createHash('sha256').update(hashString).digest('hex');
    
    const params = new URLSearchParams({
      SEKRET: secret,
      KWOTA: amount,
      NAZWA_USLUGI: name,
      ADRES_WWW: returnUrl,
      ID_ZAMOWIENIA: orderId,
      EMAIL: email,
      DANE_OSOBOWE: '',
      HASH: hash
    });
    
    const redirectUrl = `https://platnosc.hotpay.pl/?${params.toString()}`;
    
    return NextResponse.json({ redirectUrl, orderId });
    
  } catch (error) {
    console.error("HotPay checkout error", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
