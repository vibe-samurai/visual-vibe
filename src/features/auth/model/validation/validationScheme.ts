import { z } from 'zod'

export const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}])[0-9a-zA-Z!#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}]{6,}$/

export const errorMessages = {
  email: {
    required: 'Email is required',
    invalid: 'Invalid email format',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 6 characters',
    maxLength: 'Password must be at most 20 characters',
    invalid:
      'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character',
    noLeadingSpace: 'Password must not start with a space',
  },
}

interface EmailValidation {
  required: string
  invalid: string
}

interface PasswordValidation {
  required: string
  minLength: string
  maxLength: string
  invalid: string
  noLeadingSpace: string
}

const email = (messages: EmailValidation = errorMessages.email) => {
  return z.string().trim().min(1, messages.required).email(messages.invalid)
}

export const password = (messages: PasswordValidation = errorMessages.password) => {
  return z
    .string()
    .min(6, messages.minLength)
    .max(20, messages.maxLength)
    .regex(passwordRegex, messages.invalid)
    .refine(value => !value.startsWith(' '), {
      message: messages.noLeadingSpace,
    })
}

export const loginScheme = (messages: { email: EmailValidation; password: PasswordValidation }) => {
  return z.object({
    email: email(messages.email),
    password: password(messages.password),
  })
}
export type LoginFormValues = z.infer<ReturnType<typeof loginScheme>>
