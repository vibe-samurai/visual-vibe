import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  recoveryCode: '',
  recoveryEmail: '',
}

export const recoverySlice = createSlice({
  name: 'recovery',
  initialState,
  reducers: {
    setRecoveryCode: (state, action: PayloadAction<string>) => {
      state.recoveryCode = action.payload
    },
    setRecoveryEmail: (state, action: PayloadAction<string>) => {
      state.recoveryEmail = action.payload
    },
  },
})

export const { setRecoveryCode, setRecoveryEmail } = recoverySlice.actions
export default recoverySlice.reducer
