import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './lib/auth';
import { Role } from '@prisma/client';

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  const userRole = user?.role;

  const pathname = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  const publicRoutes = ['/', '/topics', '/not-found', '/api'];
  const authRoutes = ['/login', '/signup'];

  const isPublicRoute = publicRoutes.some((route) => {
    const pattern = new RegExp(`^${route}(\/|$)`);
    return pattern.test(pathname);
  });

  const isAuthRoute = authRoutes.some((route) => {
    const pattern = new RegExp(`^${route}(\/|$)`);
    return pattern.test(pathname);
  });

  if (!user) {
    if (isPublicRoute || isAuthRoute) {
      return NextResponse.next();
    }

    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user) {
    if (isAuthRoute) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/dashboard') && userRole !== Role.ADMIN) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
