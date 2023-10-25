import type { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missingParamsErrors'
import { badRequest } from '../helpers/httpHelper'
import type { Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return {
      statusCode: 201,
      body: 'Usuario criado com sucesso'
    }
  }
}
