import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  editMode: false,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },
  },
})

export const { setEditMode } = postSlice.actions
export default postSlice.reducer
