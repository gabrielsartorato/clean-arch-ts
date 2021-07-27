import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Should be able parse body as json ', async () => {
    app.post('/test_body_parser', (req, res) => {
      console.log(res)

      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Gabriel' })
      .expect({ name: 'Gabriel' })
  })
})
