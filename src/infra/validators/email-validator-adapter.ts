import validator from 'validator'
import { EmailValidator } from '../../validation/protocols/email-validator'

class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}

export { EmailValidatorAdapter }
