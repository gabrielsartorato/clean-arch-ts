import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AddAccount } from '../../../../domain/usecases/add-account'
import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'

const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const loadAccountByEmailRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, addAccountRepository, loadAccountByEmailRepository)
}

export {
  makeDbAddAccount
}
