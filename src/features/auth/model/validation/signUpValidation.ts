import { z } from 'zod'

import { passwordRegex } from './validationScheme'

const usernameRegex = /^[a-zA-Z0-9_-]+$/

const passwordMessages = {
  min: 'Password must be at least 6 characters long',
  max: 'Password must be no more than 20 characters long',
  regex:
    'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character',
  match: 'Passwords must match',
}

export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(6, { message: 'Username must be at least 6 characters long' })
      .max(30, { message: 'Username must be no more than 30 characters long' })
      .regex(usernameRegex, {
        message: 'Username can only contain letters, numbers, underscores, and hyphens',
      }),
    email: z.string().email({ message: 'The email must match the format example@example.com' }),
    password: z
      .string()
      .min(6, passwordMessages.min)
      .max(20, passwordMessages.max)
      .regex(passwordRegex, passwordMessages.regex),
    passwordConfirm: z
      .string()
      .min(6, passwordMessages.min)
      .max(20, passwordMessages.max)
      .regex(passwordRegex, passwordMessages.regex),
    agree: z.boolean(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: passwordMessages.match,
    path: ['passwordConfirm'],
  })
  .refine(data => data.agree === true, {
    message: 'You must agree to the Terms of Service and Privacy Policy',
    path: ['agree'], // Указываем путь к полю, чтобы ошибка была привязана к нему
  })

export type SignUpFields = z.infer<typeof signUpSchema>
