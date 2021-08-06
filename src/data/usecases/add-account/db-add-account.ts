import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher } from './db-add-account-protocols'

class DbAddAccount implements AddAccount {
  private readonly encrypter: Hasher
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Hasher, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { password } = accountData

    const hashedPassword = await this.encrypter.hash(password)

    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return account
  }
}

export { DbAddAccount }
