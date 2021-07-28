import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should be able reconnect if mongodb is down', async () => {
    let accountController = await sut.getCollection('accounts')
    expect(accountController).toBeTruthy()
    await sut.disconnect()
    accountController = await sut.getCollection('accounts')
    expect(accountController).toBeTruthy()
  })
})
