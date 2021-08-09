import { DebAuthentication } from './db-authentication'
import {
  AccountModel,
  AuthenticationModel,
  HashCompare,
  LoadAccountByEmailRepository,
  Encrypter,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

const makeFakeAccount = (): AccountModel => {
  return {
    id: 'any_id',
    name: 'any_name',
    email: 'anny_email@email.com',
    password: 'hashed_password'
  }
}

const makeHashCompare = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashCompareStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new EncrypterStub()
}

const makeupdateAccessToken = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update (id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeFakeAuthentication = (): AuthenticationModel => {
  return {
    email: 'any_email@email.com',
    password: 'any_password'
  }
}

interface SutTypes {
  sut: DebAuthentication
  loadAccountByEmailRepository: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepository = makeLoadAccountByEmailRepository()
  const hashCompareStub = makeHashCompare()
  const encrypterStub = makeEncrypter()
  const updateAccessTokenRepositoryStub = makeupdateAccessToken()
  const sut = new DebAuthentication(loadAccountByEmailRepository, hashCompareStub, encrypterStub, updateAccessTokenRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepository,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should be able call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')

    await sut.auth(makeFakeAuthentication())

    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('Shoeuld be able throw if loadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()

    jest.spyOn(loadAccountByEmailRepository, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  test('Should be able return null LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepository } = makeSut()

    jest.spyOn(loadAccountByEmailRepository, 'load').mockReturnValueOnce(null)

    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  test('Should be able call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()

    const comapreSpy = jest.spyOn(hashCompareStub, 'compare')

    await sut.auth(makeFakeAuthentication())

    expect(comapreSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Shoeuld be able throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()

    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  test('Should be able return null if HashCompare returns false', async () => {
    const { sut, hashCompareStub } = makeSut()

    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))

    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  test('Should be able call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()

    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.auth(makeFakeAuthentication())

    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Shoeuld be able throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  test('Should be able call Encrypter with correct id', async () => {
    const { sut } = makeSut()

    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBe('any_token')
  })

  test('Should be able call UpdateAccessToken with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()

    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')

    await sut.auth(makeFakeAuthentication())

    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Shoeuld be able throw if UpdateAccessToken throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()

    jest.spyOn(updateAccessTokenRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })
})
