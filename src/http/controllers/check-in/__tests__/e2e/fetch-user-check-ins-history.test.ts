import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
describe('Fetch user check ins history (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get check ins history from the user ', async () => {
    const token = await createAndAuthenticateUser(app)

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
