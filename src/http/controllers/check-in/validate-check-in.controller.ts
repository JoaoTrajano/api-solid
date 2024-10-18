import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateCheckInUseCase } from '@/usecases/factories'

export async function validateCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = requestBodySchema.parse(request.body)

  const registerUserUseCase = makeValidateCheckInUseCase()
  try {
    await registerUserUseCase.execute({
      checkInId,
    })
    return reply.status(200).send()
  } catch (error) {
    return reply.status(500).send()
  }
}
