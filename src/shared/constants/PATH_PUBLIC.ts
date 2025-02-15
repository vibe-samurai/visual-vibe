import { getPublicPath } from '../utils/getPublicPath'

const SVG = 'svg'

export const PATH_PUBLIC = {
  IMG: {},
  SVG: {
    EMAIL_CONFIRMED: { path: getPublicPath(SVG, 'bro.svg'), alt: 'email confirmed img' },
  },
}
