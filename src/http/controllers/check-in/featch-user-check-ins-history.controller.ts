import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchUserCheckInsHistoryUseCase } from '@/usecases/factories'

export async function featchUserCheckinsHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    page: z.coerce.number(),
  })
  const { page } = requestBodySchema.parse(request.body)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  try {
    await fetchUserCheckInsHistoryUseCase.execute({
      userId: request.user.sub,
      page,
    })
    return reply.status(200).send()
  } catch (error) {
    return reply.status(500).send()
  }
}
