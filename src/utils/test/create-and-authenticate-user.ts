import { FastifyInstance } from 'fastify'

import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
): Promise<string> {
  await request(app.server).post('/users').send({
    name: 'Jhon Doe',
    email: 'jhondoe@example.com',
    password: '123456',
  })

  const response = await request(app.server).post('/authenticate').send({
    email: 'jhondoe@example.com',
    password: '123456',
  })

  const { token } = response.body

  return token
}
