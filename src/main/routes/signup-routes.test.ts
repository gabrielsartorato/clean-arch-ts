import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should be able return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Gabriel',
        email: 'gabriel@email.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
