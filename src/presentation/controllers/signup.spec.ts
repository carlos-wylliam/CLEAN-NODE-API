import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missingParamsErrors'
import { InvalidParamError } from '../errors/InvalidParamsErrors'
import { EmailValidator } from '../protocols/emailValidator'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorSub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorSub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@example.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
})

test('Should return 400 if no email is provided', () => {
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse.statusCode).toBe(400)
  expect(httpResponse.body).toEqual(new MissingParamError('email'))
})

test('Should return 400 if no password is provided', () => {
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email@example.com',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse.statusCode).toBe(400)
  expect(httpResponse.body).toEqual(new MissingParamError('password'))
})

test('Should return 400 if no password confirmation is provided', () => {
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@example.com'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse.statusCode).toBe(400)
  expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
})

test('Should return 400 if an invalid email is provided', () => {
  const { sut, emailValidatorStub } = makeSut()
  jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
  const httpRequest = {
    body: {
      name: 'any_name',
      email: 'invalid_email@example.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse.statusCode).toBe(400)
  expect(httpResponse.body).toEqual(new InvalidParamError('email'))
})
