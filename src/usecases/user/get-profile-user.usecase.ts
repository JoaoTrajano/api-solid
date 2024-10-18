import { User } from '@prisma/client'

import { UserRepository } from '@/repositories/user.repository'
import { ResourceNotFoundError } from '@/errors'

export type GetProfileUserUseCaseInput = {
  userId: string
}

export type GetProfileUserUseCaseOutput = { user: User }

export class GetProfileUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    input: GetProfileUserUseCaseInput,
  ): Promise<GetProfileUserUseCaseOutput> {
    const user = await this.userRepository.findById(input.userId)

    if (!user) throw new ResourceNotFoundError()

    return { user }
  }
}
