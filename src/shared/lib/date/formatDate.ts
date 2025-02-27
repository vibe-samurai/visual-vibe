export const formatDate = (isoString: string): string => {
  const now = new Date()
  const date = new Date(isoString)

  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  } else {
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`
  }
}
