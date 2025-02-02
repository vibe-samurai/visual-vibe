'use client'

import { Button } from '@vibe-samurai/visual-ui-kit'

export default function Home() {
  return (
    <>
      <div style={{ marginBottom: '250px' }}>Home Page</div>
      <Button variant={'primary'} onClick={() => alert('button works')}>
        button
      </Button>
    </>
  )
}
