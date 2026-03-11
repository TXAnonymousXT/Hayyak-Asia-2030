import { NextRequest, NextResponse } from 'next/server';

const ACCESS_COOKIE_NAME = 'doha2030_access';
const ACCESS_SECRET = 'doha2030_secret_access_2024_xK9mP';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (token !== ACCESS_SECRET) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // Set the access cookie and redirect to homepage
  const response = NextResponse.redirect(new URL('/', request.url));

  response.cookies.set(ACCESS_COOKIE_NAME, ACCESS_SECRET, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });

  return response;
}
