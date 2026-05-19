import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from './lib/auth';

export async function proxy(request) {

  const pathname = request.nextUrl.pathname;


const session = await auth.api.getSession({
    headers: await headers() 
  
})
console.log(session)

const protectedRoutes = [
    "/add-idea'",
    "/my-ideas",
    "/my-interactions",
    "/ideas"  ];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

    if (isProtected && !session) {
      const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
    }
  

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/add-idea',
    '/my-ideas',
    '/my-interactions',
    '/ideas/:id*' 
  ],
};


