import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterUserUseCase } from '@/usecases/factories'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = requestBodySchema.parse(request.body)

  const registerUserUseCase = makeRegisterUserUseCase()
  try {
    await registerUserUseCase.execute({ email, name, password })
    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send()
  }
}
