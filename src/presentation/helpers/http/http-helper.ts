import { HttpResponse } from '../../protocols/http'
import { ServerError, Unauthorized } from '../../errors'

const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

const forbidden = (error: Error): HttpResponse => {
  return {
    statusCode: 403,
    body: error
  }
}

const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}

const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new Unauthorized()
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
  ok,
  unauthorized,
  forbidden
}
