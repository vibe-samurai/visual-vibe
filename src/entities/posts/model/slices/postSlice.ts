import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LikeItem } from '../../types'
type PostState = {
  editMode: boolean
  editText: string
  confirmCloseEditing: boolean
}
const initialState: PostState = {
  editMode: false,
  editText: '',
  confirmCloseEditing: false,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },
    setEditText: (state, action: PayloadAction<string>) => {
      state.editText = action.payload
    },
    setConfirmCloseEditing: (state, action: PayloadAction<boolean>) => {
      state.confirmCloseEditing = action.payload
    },
  },
})

export const { setEditMode, setEditText, setConfirmCloseEditing } = postSlice.actions
export default postSlice.reducer
