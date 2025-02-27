export const formatExactDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
