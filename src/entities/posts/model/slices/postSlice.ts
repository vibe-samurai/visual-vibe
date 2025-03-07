import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LikeItem } from '../../types'
type PostState = {
  editMode: boolean
  confirmCloseEditing: boolean
  likesListIsOpen: boolean
  likesList: LikeItem[] // Указываем явный тип массива
}
const initialState: PostState = {
  editMode: false,
  confirmCloseEditing: false,
  likesListIsOpen: false,
  likesList: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },
    setConfirmCloseEditing: (state, action: PayloadAction<boolean>) => {
      state.confirmCloseEditing = action.payload
    },
    setLikesListOpen: (state, action: PayloadAction<boolean>) => {
      state.likesListIsOpen = action.payload
    },
    setLikesList: (state, action: PayloadAction<LikeItem[]>) => {
      state.likesList = action.payload
    },
    clearLikesList: state => {
      state.likesList = []
    },
  },
})

export const {
  setEditMode,
  setConfirmCloseEditing,
  setLikesListOpen,
  setLikesList,
  clearLikesList,
} = postSlice.actions
export default postSlice.reducer
