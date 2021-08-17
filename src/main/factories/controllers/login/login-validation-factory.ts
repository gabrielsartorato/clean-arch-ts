
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validations'
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator-adapter'

const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}

export {
  makeLoginValidation
}
