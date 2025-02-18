import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  recoveryCode: '',
}

const recoverySlice = createSlice({
  name: 'recovery',
  initialState,
  reducers: {
    setRecoveryCode: (state, action) => {
      state.recoveryCode = action.payload
    },
  },
})

export const { setRecoveryCode } = recoverySlice.actions
export default recoverySlice.reducer
