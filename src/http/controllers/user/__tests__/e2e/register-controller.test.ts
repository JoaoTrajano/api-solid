import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able register user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })
})
