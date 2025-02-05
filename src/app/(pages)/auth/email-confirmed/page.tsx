'use client'

import * as Label from '@radix-ui/react-label'
import { Button, Typography } from '@vibe-samurai/visual-ui-kit'
import Image from 'next/image'
import Link from 'next/link'

export default function EmailConfirmed() {
  return (
    <div>
      {/* <Typography as={'h1'} variant={'h1'}>
        {'Text'}
      </Typography> */}
      <Button>Btn</Button>
      <Link href={'/'}>Home</Link>
      <Image src={'/svg/bro.svg'} alt={'dog'} width={432} height={300} />
      <Label.Root className={'LabelRoot'} htmlFor={'firstName'}>
        First name
      </Label.Root>
    </div>
  )
}
