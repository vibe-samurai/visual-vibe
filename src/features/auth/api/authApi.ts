import { baseAppApi } from '@/app/services'
import {
  ConfirmResponse,
  EmailConfirmResponse,
  GoogleOAuthRequest,
  GoogleOAuthResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  NewPasswordData,
  RecoveryPasswordData,
  RecoveryPasswordResending,
  SignUpResponse,
} from '@/features/auth/types'
import { deleteCookie, setCookie } from '@/features/auth/utils/cookieUtils'
import { PROJECT_HOST } from '@/shared/constants'

export const authApi = baseAppApi.injectEndpoints({
  endpoints: builder => ({
    // Регистрация и подтверждение email
    signup: builder.mutation<void, SignUpResponse>({
      query: body => ({
        url: '/v1/auth/registration',
        method: 'POST',
        body: { ...body, baseUrl: PROJECT_HOST },
      }),
    }),
    confirmEmail: builder.query<void, EmailConfirmResponse>({
      query: body => ({
        url: '/v1/auth/registration-confirmation',
        method: 'POST',
        body: { ...body },
      }),
      transformErrorResponse: (response: ConfirmResponse) => response.data.messages[0],
    }),
    resendVerificationEmail: builder.mutation<void, string>({
      query: email => ({
        url: '/v1/auth/registration-email-resending',
        method: 'POST',
        body: { email, baseUrl: 'http://localhost:3000/' },
      }),
    }),

    // Восстановление пароля
    recoveryPassword: builder.mutation<void, RecoveryPasswordData>({
      query: body => ({
        url: 'v1/auth/password-recovery',
        method: 'POST',
        body,
      }),
    }),
    checkRecoveryCode: builder.mutation<{ email: string }, { recoveryCode: string }>({
      query: ({ recoveryCode }) => ({
        method: 'POST',
        url: 'v1/auth/check-recovery-code',
        body: { recoveryCode },
      }),
    }),
    recoveryPasswordResending: builder.mutation<void, RecoveryPasswordResending>({
      query: body => ({
        url: 'v1/auth/password-recovery-resending',
        method: 'POST',
        body,
      }),
    }),
    createNewPassword: builder.mutation<void, NewPasswordData>({
      query: body => ({
        method: 'POST',
        url: 'v1/auth/new-password',
        body,
      }),
    }),

    // Авторизация и выход
    login: builder.mutation<LoginResponse, LoginRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (data) setCookie('accessToken', data.accessToken.trim(), 7)
      },
      query: body => ({
        url: 'v1/auth/login',
        method: 'POST',
        body,
      }),
    }),
    googleOAuth: builder.mutation<GoogleOAuthResponse, GoogleOAuthRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled

        if (data) setCookie('accessToken', data.accessToken.trim(), 7)
      },
      invalidatesTags: ['Me'],
      query: args => ({
        body: args,
        method: 'POST',
        url: 'v1/auth/google/login',
      }),
    }),
    logout: builder.mutation<void, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        deleteCookie('accessToken')
        deleteCookie('userData')
        dispatch(authApi.util.resetApiState())
      },
      query: () => ({
        method: 'POST',
        url: 'v1/auth/logout',
      }),
    }),

    // Получение данных пользователя
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),

    // Обновление токенов
    updateTokens: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: 'v1/auth/update-tokens',
      }),
    }),
  }),
})

export const {
  useSignupMutation, // Регистрация
  useConfirmEmailQuery, // Подтверждение email
  useResendVerificationEmailMutation, // Повторная отправка подтверждения
  useRecoveryPasswordMutation, // Восстановление пароля
  useCheckRecoveryCodeMutation, // Проверка кода восстановления
  useCreateNewPasswordMutation, // Создание нового пароля
  useRecoveryPasswordResendingMutation, // Повторная отправка кода восстановления
  useLoginMutation, // Авторизация
  useGoogleOAuthMutation, // Авторизация через Google
  useUpdateTokensMutation, // Обновление токенов
  useMeQuery, // Получение данных пользователя
  useLazyMeQuery, // Ленивый запрос данных пользователя
  useLogoutMutation, // Выход из системы
} = authApi
