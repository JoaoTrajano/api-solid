import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get profile user ', async () => {
    await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    const authenticateResponse = await request(app.server)
      .post('/authenticate')
      .send({
        email: 'jhondoe@example.com',
        password: '123456',
      })

    const { token } = (await authenticateResponse.request).body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'jhondoe@example.com',
      }),
    )
  })
})
