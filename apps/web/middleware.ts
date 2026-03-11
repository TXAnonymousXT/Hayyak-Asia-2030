import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/navigation';
import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// MAINTENANCE MODE - Set to false to reopen the site publicly
// ============================================================
const MAINTENANCE_MODE = true;

const ACCESS_COOKIE_NAME = 'doha2030_access';
const ACCESS_SECRET = 'doha2030_secret_access_2024_xK9mP';

const intlMiddleware = createMiddleware(routing);

const COMING_SOON_HTML = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Doha 2030 - Coming Soon</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F9F6F1;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #333;
    }
    .container {
      text-align: center;
      padding: 2rem;
      max-width: 600px;
    }
    .logo-text {
      font-size: 3rem;
      font-weight: 300;
      letter-spacing: 0.2em;
      color: #8D1B3D;
      margin-bottom: 0.25rem;
    }
    .subtitle {
      font-size: 0.875rem;
      letter-spacing: 0.15em;
      color: #8B9A46;
      text-transform: uppercase;
      margin-bottom: 2rem;
    }
    .divider {
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, #8B9A46, #C9A86C, #8D1B3D, #C75B4A);
      margin: 0 auto 2rem;
      border-radius: 2px;
    }
    h1 {
      font-size: 2rem;
      font-weight: 400;
      color: #8D1B3D;
      margin-bottom: 0.5rem;
    }
    .arabic {
      font-size: 2rem;
      font-weight: 400;
      color: #C9A86C;
      margin-bottom: 1.5rem;
      direction: rtl;
    }
    p {
      font-size: 1rem;
      color: #666;
      line-height: 1.6;
    }
    .dots {
      margin-top: 2rem;
      display: flex;
      gap: 8px;
      justify-content: center;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      animation: pulse 1.5s ease-in-out infinite;
    }
    .dot:nth-child(1) { background: #8B9A46; animation-delay: 0s; }
    .dot:nth-child(2) { background: #C9A86C; animation-delay: 0.3s; }
    .dot:nth-child(3) { background: #8D1B3D; animation-delay: 0.6s; }
    .dot:nth-child(4) { background: #C75B4A; animation-delay: 0.9s; }
    @keyframes pulse {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo-text">DOHA 2030</div>
    <div class="subtitle">21st Asian Games</div>
    <div class="divider"></div>
    <h1>Coming Soon</h1>
    <div class="arabic">قريباً</div>
    <p>We're working on something amazing. Stay tuned!</p>
    <div class="dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</body>
</html>`;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If maintenance mode is off, just run i18n middleware normally
  if (!MAINTENANCE_MODE) {
    return intlMiddleware(request);
  }

  // Always allow the access API route
  if (pathname.startsWith('/api/access')) {
    return NextResponse.next();
  }

  // Always allow static assets and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check for access cookie
  const accessCookie = request.cookies.get(ACCESS_COOKIE_NAME);

  if (accessCookie?.value === ACCESS_SECRET) {
    // Authorized - run normal i18n middleware
    return intlMiddleware(request);
  }

  // Not authorized - show Coming Soon page
  return new NextResponse(COMING_SOON_HTML, {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Retry-After': '86400',
    },
  });
}

export const config = {
  matcher: [
    '/',
    '/(ar|en|zh|ja|ko|hi|th|vi|id|ms|fa|ur|bn|ta|tl|my|km|lo|ne|si)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
