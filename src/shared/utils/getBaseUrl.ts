export const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_BASE_URL_DEV || 'http://localhost:3000'
  }

  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_BASE_URL_PROD || 'https://visual-vibe.uk'
  }

  return ''
}
