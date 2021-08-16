import { AccountModel, AddAccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeEncrypter = (): Hasher => {
  class EncrypterStub implements Hasher {
    async hash (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
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
    email: 'valid_email@email.com',
    password: 'hashed_password'
  }
}

const makeFakeAccountData = (): AddAccountModel => {
  return {
    name: 'valid_name',
    email: 'valid_email@email.com',
    password: 'valid_password'
  }
}

interface SutTypes {
  sut: DbAddAccount
  encryptSpyStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepository: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepository = makeLoadAccountByEmailRepository()
  const encryptSpyStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encryptSpyStub, addAccountRepositoryStub, loadAccountByEmailRepository)

  return {
    sut,
    encryptSpyStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepository
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
      email: 'valid_email@email.com',
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


  test('Should be able call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'loadByEmail')

    await sut.add(makeFakeAccountData())

    expect(loadSpy).toHaveBeenCalledWith('valid_email@email.com')
  })



  test('Should be able return null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()

    jest.spyOn(loadAccountByEmailRepository, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeAccount())))

    const accont = await sut.add(makeFakeAccountData())

    expect(accont).toBeNull()
  })
})
