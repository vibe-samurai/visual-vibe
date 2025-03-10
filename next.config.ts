import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY,
    NEXT_PUBLIC_PATH_AUTH_GITHUB: process.env.NEXT_PUBLIC_PATH_AUTH_GITHUB,
    NEXT_PUBLIC_CLIENT_ID_GOOGLE: process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_INCTAGRAM_API_URL: process.env.NEXT_PUBLIC_INCTAGRAM_API_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '/trainee-instagram-api/Image/**',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
}

export default nextConfig
