import { AccountModel, AddAccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Hasher => {
  class EncrypterStub implements Hasher {
    async hash (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeFakeAccount = (): AccountModel => {
  return {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    password: 'hashed_password'
  }
}

const makeFakeAccountData = (): AddAccountModel => {
  return {
    name: 'valid_name',
    email: 'valid_email',
    password: 'valid_password'
  }
}

interface SutTypes {
  sut: DbAddAccount
  encryptSpyStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encryptSpyStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encryptSpyStub, addAccountRepositoryStub)

  return {
    sut,
    encryptSpyStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should be able call Encrypter with correct password', async () => {
    const { encryptSpyStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encryptSpyStub, 'hash')

    await sut.add(makeFakeAccountData())

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should be able throw if Encrypter throws', async () => {
    const { encryptSpyStub, sut } = makeSut()

    jest.spyOn(encryptSpyStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(makeFakeAccountData())

    await expect(promise).rejects.toThrow()
  })

  test('Should be able call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(makeFakeAccountData())

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('Should be able throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(makeFakeAccountData())

    await expect(promise).rejects.toThrow()
  })

  test('Should be able return an account on succes', async () => {
    const { sut } = makeSut()

    const accont = await sut.add(makeFakeAccountData())

    expect(accont).toEqual(makeFakeAccount())
  })
})
