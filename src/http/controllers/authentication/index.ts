import { FastifyInstance } from 'fastify'

import { refresh } from './refresh.controller'
import { authenticate } from './authenticate.controller'

export async function authenticateRoutes(app: FastifyInstance) {
  app.post('/authenticate', authenticate)
  app.post('/token/refresh', refresh)
}
