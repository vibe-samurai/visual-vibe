import { NextRequest, NextResponse } from 'next/server'

import { PATH } from '@/shared/constants/PATH'

export function middleware(request: NextRequest) {
  // publicPaths can be a string or a regex
  const publicPaths = [
    PATH.AUTH.LOGIN,
    PATH.AUTH.SIGNUP,
    PATH.AUTH.VERIFICATION_LINK_EXPIRED,
    PATH.AUTH.RECOVERY_LINK_EXPIRED,
    PATH.AUTH.FORGOT_PASSWORD,
    PATH.AUTH.RECOVERY,
    PATH.AUTH.PRIVACY_POLICY,
    PATH.AUTH.REGISTRATION_CONFIRMATION,
    PATH.AUTH.TERMS_OF_SERVICE,
    PATH.AUTH.UPDATE_TOKENS,
    PATH.MAIN,
    PATH.GITHUB,
    PATH.PUBLIC_PAGE,
  ]
  const { pathname } = request.nextUrl

  if (publicPaths.some(path => path === pathname)) {
    return NextResponse.next()
  }

  const encryptedToken = request.cookies.get('accessToken')?.value

  if (!encryptedToken) {
    return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
