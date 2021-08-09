import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  },

  async compare (): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should be able call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should be able return a valid hash on hash success', async () => {
    const sut = makeSut()

    const hash = await sut.hash('any_value')

    expect(hash).toBe('hash')
  })

  test('Should be able throw if hash throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementation(() => { throw new Error() })

    const promise = sut.hash('any_value')

    await expect(promise).rejects.toThrow()
  })

  test('Should be able call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')

    await sut.compare('any_value', 'any_hash')

    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should be able return true when compare succeds', async () => {
    const sut = makeSut()

    const hash = await sut.compare('any_value', 'any_hash')

    expect(hash).toBe(true)
  })

  test('Should be able return true when compare fails', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => Promise.resolve(false))

    const hash = await sut.compare('any_value', 'any_hash')

    expect(hash).toBe(false)
  })

  test('Should be able throw if compare throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => { throw new Error() })

    const promise = sut.compare('any_value', 'any_hash')

    await expect(promise).rejects.toThrow()
  })
})
