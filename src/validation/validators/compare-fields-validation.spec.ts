import { InvalidParamError } from '../../presentation/errors'
import { CompareFieldValidation } from './compare-fields-validations'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('CompareFields Validations', () => {
  test('Should be able return a InvalidParamError if Validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_value', fieldToCompare: 'wrong_value' })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should be able not return if validation success', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })

    expect(error).toBeFalsy()
  })
})
