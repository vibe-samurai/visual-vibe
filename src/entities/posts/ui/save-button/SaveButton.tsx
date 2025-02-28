import { useState } from 'react'

import { SaveIconFill } from '@public/icon/SaveIconFill'
import { SaveIconOutline } from '@public/icon/SaveIconOutline'
type Props = {
  save?: boolean
}

export const SaveButton = ({ save = false }: Props) => {
  const [saveStatus, setSaveStatus] = useState<boolean>(save)

  return (
    <button
      type={'button'}
      style={{ cursor: 'pointer' }}
      onClick={() => setSaveStatus(!saveStatus)}
    >
      {saveStatus ? <SaveIconFill /> : <SaveIconOutline />}
    </button>
  )
}
