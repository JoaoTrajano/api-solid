import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterCheckInUseCase } from '@/usecases/factories'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestParamsSchema = z.object({
    gymId: z.string(),
  })

  const requestBodySchema = z.object({
    userLatitude: z.coerce.number(),
    userLongitude: z.coerce.number(),
  })

  const { userLatitude, userLongitude } = requestBodySchema.parse(request.body)
  const { gymId } = requestParamsSchema.parse(request.params)

  const registerCheckInUseCase = makeRegisterCheckInUseCase()
  try {
    await registerCheckInUseCase.execute({
      userId: request.user.sub,
      gymId,
      userLatitude,
      userLongitude,
    })
    return reply.status(201).send()
  } catch (error) {
    return reply.status(500).send()
  }
}
