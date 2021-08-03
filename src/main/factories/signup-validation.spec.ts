import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { Validation } from '../../presentation/helpers/validators/validations'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should be abel call ValidationComposite with all validations', () => {
    makeSignUpValidation()

    const validationsFields: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validationsFields.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenLastCalledWith(validationsFields)
  })
})
