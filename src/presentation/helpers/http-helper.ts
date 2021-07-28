import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors'

const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}

const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export {
  badRequest,
  serverError,
  ok
}
