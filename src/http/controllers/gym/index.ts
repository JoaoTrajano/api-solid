import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlawares/verify-jwt'

import { search } from './search.controller'
import { register } from './register.controller'
import { findNearby } from './find-nearby.controller'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gym', register)
  app.get('/gym/search', search)
  app.get('/gym/find-nearby', findNearby)
}
