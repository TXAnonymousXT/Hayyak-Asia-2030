import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/navigation';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files (_next, images, etc.)
  // - Public files (favicon, manifest, etc.)
  matcher: [
    '/',
    '/(ar|en|zh|ja|ko|hi|th|vi|id|ms|fa|ur|bn|ta|tl|my|km|lo|ne|si)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
