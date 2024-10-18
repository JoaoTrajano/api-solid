import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/usecases/factories'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  try {
    const { user } = await getUserProfileUseCase.execute({
      userId: request.user.sub,
    })
    return reply.status(200).send({
      user: {
        ...user,
        passwordHash: undefined,
      },
    })
  } catch (error) {
    return reply.status(500).send()
  }
}
