import React, { ComponentPropsWithoutRef } from 'react'

import s from './TransparentBackground.module.scss'
type Props = ComponentPropsWithoutRef<'div'> & {
  isOpen: boolean
  className?: string
}
export const TransparentBackground = ({ isOpen, children }: Props) => {
  return <div className={`${s.transparentBackground} ${isOpen && s.open}`}>{children}</div>
}
