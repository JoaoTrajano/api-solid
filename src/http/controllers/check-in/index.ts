import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlawares/verify-jwt'

import { register } from './register.controller'
import { validateCheckIn } from './validate-check-in.controller'
import { featchUserCheckinsHistory } from './featch-user-check-ins-history.controller'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/check-in', register)
  app.patch('/check-in/validate', validateCheckIn)
  app.get('/check-in/fetch-history-check-ins', featchUserCheckinsHistory)
}
