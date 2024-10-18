import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { env } from './env'

import {
  gymRoutes,
  appUserRoutes,
  checkInRoutes,
  authenticateRoutes,
} from '@/http/controllers'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JTW_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})
app.register(fastifyCookie)
app.register(authenticateRoutes)
app.register(gymRoutes)
app.register(appUserRoutes)
app.register(checkInRoutes)
