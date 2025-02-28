import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  editMode: false,
  confirmCloseEditing: false,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },
    setconfirmCloseEditing: (state, action: PayloadAction<boolean>) => {
      state.confirmCloseEditing = action.payload
    },
  },
})

export const { setEditMode, setconfirmCloseEditing } = postSlice.actions
export default postSlice.reducer
