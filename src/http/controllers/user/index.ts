import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlawares/verify-jwt'

import { profile } from './profile.controller'
import { register } from './register.controller'

export async function appUserRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
