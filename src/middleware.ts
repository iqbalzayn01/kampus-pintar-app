import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './lib/auth';

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  const pathname = req.nextUrl.pathname;

  const publicRoutes = ['/', '/login', '/signup', '/threads'];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!user && !isPublicRoute) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (
    user &&
    (pathname.startsWith('/login') || pathname.startsWith('/signup'))
  ) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
