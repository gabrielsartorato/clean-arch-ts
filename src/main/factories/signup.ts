import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'
import { makeSignUpValidation } from './signup-validation'

const makeSignUpController = (): Controller => {
  const salt = 12
  const emailvalidator = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const signupController = new SignUpController(emailvalidator, addAccount, makeSignUpValidation())
  const mongoLogRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, mongoLogRepository)
}

export {
  makeSignUpController
}
