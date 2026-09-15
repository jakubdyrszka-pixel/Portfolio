import { NextResponse } from 'next/server';

// HotPay redirects here after payment (often via POST)
export async function POST(request: Request) {
  const baseUrl = new URL(request.url).origin;
  // Redirect back to the activate page using a GET request (303 See Other)
  return NextResponse.redirect(`${baseUrl}/physionotes/activate`, 303);
}

export async function GET(request: Request) {
  const baseUrl = new URL(request.url).origin;
  return NextResponse.redirect(`${baseUrl}/physionotes/activate`, 303);
}
