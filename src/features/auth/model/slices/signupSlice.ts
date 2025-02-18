import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SignUpState {
  userName?: string
  email?: string
  password?: string
  passwordConfirm?: string
  agree?: boolean
}

const initialState: SignUpState = {
  userName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  agree: false,
}

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<SignUpState>) => {
      Object.assign(state, action.payload)
    },
    resetForm: state => {
      state.email = ''
      state.password = ''
      state.passwordConfirm = ''
      state.userName = ''
      state.agree = false
    },
  },
})

export const { setForm, resetForm } = signupSlice.actions

export default signupSlice.reducer
