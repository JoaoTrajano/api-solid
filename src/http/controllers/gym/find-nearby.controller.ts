import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchNearbyGymsUseCase } from '@/usecases/factories'

export async function findNearby(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    userLatitude: z.coerce.number(),
    userLongitude: z.coerce.number(),
  })

  const { userLatitude, userLongitude } = requestBodySchema.parse(request.body)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()
  try {
    await fetchNearbyGymsUseCase.execute({
      userLatitude,
      userLongitude,
    })
    return reply.status(200).send()
  } catch (error) {
    return reply.status(500).send()
  }
}
