import type { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missingParamsErrors'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
    return {
      statusCode: 201,
      body: 'Usuario criado com sucesso'
    }
  }
}
