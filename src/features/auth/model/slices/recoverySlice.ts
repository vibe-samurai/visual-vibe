import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  recoveryCode: '',
}

export const recoverySlice = createSlice({
  name: 'recovery',
  initialState,
  reducers: {
    setRecoveryCode: (state, action: PayloadAction<string>) => {
      state.recoveryCode = action.payload
    },
  },
})

export const { setRecoveryCode } = recoverySlice.actions
export default recoverySlice.reducer
