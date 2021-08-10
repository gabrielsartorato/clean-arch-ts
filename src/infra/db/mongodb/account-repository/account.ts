import { MongoHelper } from '../helpers/mongo-helper'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'

class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollections = await MongoHelper.getCollection('accounts')

    const result = await accountCollections.insertOne(accountData)

    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollections = await MongoHelper.getCollection('accounts')

    const account = await accountCollections.findOne({ email })

    return account && MongoHelper.map(account)
  }
}

export { AccountMongoRepository }
