import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type ResponseError = {
  status: number | string
  data: ResponseErrorData
}

type ResponseErrorData = {
  statusCode: number
  error: string
  messages: ErrorMessages[]
}

type ErrorMessages = {
  field: string
  message: string
}

export const useRequestError = (
  error: FetchBaseQueryError | SerializedError | string | null | undefined
): string | null => {
  let errorMessage: string | null = null

  if (!error) return errorMessage

  if (typeof error === 'string') {
    errorMessage = error
  } else if ((error as FetchBaseQueryError).status === 'FETCH_ERROR') {
    errorMessage = 'No internet connection'
  } else if ((error as ResponseError).status && +(error as ResponseError).status >= 500) {
    errorMessage = 'Internal Server Error. Please try again later.'
  } else if ((error as ResponseError).data?.messages) {
    errorMessage = (error as ResponseError).data.messages[0].message
  }

  return errorMessage
}
