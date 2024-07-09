/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { TErrorSource } from '../interface'
import handleZodError from '../errors/handleZodError'
import config from '../config'

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500
  let message = 'something went wrong'

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'something went wrong!!',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err?.stack : null,
  })
}
