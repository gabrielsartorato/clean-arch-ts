import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validations', () => {
  test('Should be able return a MissingParamError if Validation fails', () => {
    const sut = new RequiredFieldValidation('field')

    const error = sut.validate({ name: 'any_name' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should be able not return if validation success', () => {
    const sut = new RequiredFieldValidation('field')

    const error = sut.validate({ field: 'any_name' })

    expect(error).toBeFalsy()
  })
})
