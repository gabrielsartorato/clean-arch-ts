import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encryptSpyStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encryptSpyStub = makeEncrypter()
  const sut = new DbAddAccount(encryptSpyStub)

  return {
    sut,
    encryptSpyStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should be able call Encrypter with correct password', async () => {
    const { encryptSpyStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encryptSpyStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
