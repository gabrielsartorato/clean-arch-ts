import { DebAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../config/env'
import { Authentication } from '../../../../domain/usecases/authentication'

const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bCryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  return new DebAuthentication(accountMongoRepository, bCryptAdapter, jwtAdapter, accountMongoRepository)
}

export {
  makeDbAuthentication
}
