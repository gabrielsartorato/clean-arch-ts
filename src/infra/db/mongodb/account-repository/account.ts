import { MongoHelper } from '../helpers/mongo-helper'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollections = await MongoHelper.getCollection('accounts')

    const result = await accountCollections.insertOne(accountData)

    return MongoHelper.map(result.ops[0])
  }
}

export { AccountMongoRepository }
