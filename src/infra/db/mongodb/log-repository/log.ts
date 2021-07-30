import { LogErrorRepository } from '../../../../data/protocols/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorColletion = await MongoHelper.getCollection('errors')
    await errorColletion.insertOne({
      stack,
      date: new Date()
    })
  }
}

export {
  LogMongoRepository
}
