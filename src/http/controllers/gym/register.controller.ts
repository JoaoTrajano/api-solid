import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterGymUseCase } from '@/usecases/factories'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const { name, description, phone, latitude, longitude } =
    requestBodySchema.parse(request.body)

  const registerGymUseCase = makeRegisterGymUseCase()
  try {
    await registerGymUseCase.execute({
      name,
      description,
      phone,
      latitude,
      longitude,
    })
    return reply.status(201).send()
  } catch (error) {
    return reply.status(500).send()
  }
}
