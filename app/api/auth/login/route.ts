import { NextResponse } from 'next/server'
import { signAuth } from '@/auth'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  // Here you would typically validate the email and password against your database
  // For this example, we'll just check if they're not empty
  if (email && password) {
    const token = await signAuth({ email })
    
    const response = NextResponse.json({ success: true })
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    })

    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}

