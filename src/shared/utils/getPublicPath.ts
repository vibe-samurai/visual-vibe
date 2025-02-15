export const getPublicPath = (subfolders: string | string[], filename: string): string => {
  const subfolderArray = typeof subfolders === 'string' ? [subfolders] : subfolders
  const subfolderPath = subfolderArray.join('/')

  return `/${subfolderPath}/${filename}`
}
