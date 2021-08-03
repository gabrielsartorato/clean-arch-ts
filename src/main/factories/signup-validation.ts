
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { Validation } from '../../presentation/helpers/validators/validations'

const makeSignUpValidation = (): ValidationComposite => {
  const validationsFields: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validationsFields.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validationsFields)
}

export {
  makeSignUpValidation
}
