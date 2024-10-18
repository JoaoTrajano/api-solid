import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchGymsUseCase } from '@/usecases/factories'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    search: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { search, page } = requestBodySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()
  try {
    await searchGymsUseCase.execute({
      search,
      page,
    })
    return reply.status(200).send()
  } catch (error) {
    return reply.status(500).send()
  }
}
