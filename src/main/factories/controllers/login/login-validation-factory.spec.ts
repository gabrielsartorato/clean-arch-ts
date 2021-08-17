import { Validation } from '../../../../presentation/protocols/validations'
import { makeLoginValidation } from './login-validation-factory'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { EmailValidator } from '../../../../validation/protocols/email-validator'

jest.mock('../../../../validation/validators/validation-composite.ts')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should be abel call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
