import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Check if the URL matches the old pattern /estado/[slug]/cidade/[citySlug]
  if (url.pathname.startsWith('/estado/') && url.pathname.includes('/cidade/')) {
    // Extract the parts and create the new URL
    const parts = url.pathname.split('/');
    if (parts.length === 5) { // /estado/{slug}/cidade/{citySlug}
      const newUrl = `/estado/${parts[2]}/${parts[4]}`;
      return NextResponse.redirect(new URL(newUrl, request.url), 301);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/estado/:slug*/cidade/:citySlug*',
};