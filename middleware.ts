import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuth } from './auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  const verifiedToken = token && await verifyAuth(token).catch((err) => {
    console.error(err.message)
  })

  const isPublicPath = request.nextUrl.pathname === '/login' || 
                       request.nextUrl.pathname === '/signup' ||
                       request.nextUrl.pathname === '/' ||
                       request.nextUrl.pathname.startsWith('/api/auth')

  if (!isPublicPath && !verifiedToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isPublicPath && verifiedToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

