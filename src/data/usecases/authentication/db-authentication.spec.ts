import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DebAuthentication } from './db-authentication'

describe('DbAuthentication UseCase', () => {
  test('Shoeuld be able call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'anny_email@email.com',
          password: 'any_password'
        }
        return new Promise(resolve => resolve(account))
      }
    }

    const loadAccountByEmailRepository = new LoadAccountByEmailRepositoryStub()
    const sut = new DebAuthentication(loadAccountByEmailRepository)

    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')

    await sut.auth({
      email: 'anny_email@email.com',
      password: 'any_password'
    })

    expect(loadSpy).toHaveBeenCalledWith('anny_email@email.com')
  })
})
