import { jwtVerify, SignJWT } from 'jose'

const SECRET_KEY = process.env.JWT_SECRET_KEY!

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY))
    return verified.payload
  } catch (err) {
    throw new Error('Your token has expired.')
  }
}

export async function signAuth(payload: any) {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 // 1 hour

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(SECRET_KEY))
}

