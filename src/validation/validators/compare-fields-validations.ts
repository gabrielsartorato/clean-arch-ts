import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

class CompareFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}

export {
  CompareFieldValidation
}
