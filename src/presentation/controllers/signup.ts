import type { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missingParamsErrors'
import { badRequest } from '../helpers/httpHelper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    return {
      statusCode: 201,
      body: 'Usuario criado com sucesso'
    }
  }
}
