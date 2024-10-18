import bcryptjs from 'bcryptjs'
import { User } from '@prisma/client'

import { InvalidCredentialsError } from '@/errors'
import { UserRepository } from '@/repositories/user.repository'

export type AuthenticateUseCaseInput = {
  email: string
  password: string
}

export type AuthenticateUseCaseOutput = { user: User }

export class AuthenticateUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    input: AuthenticateUseCaseInput,
  ): Promise<AuthenticateUseCaseOutput> {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatches = await bcryptjs.compare(
      input.password,
      user.passwordHash,
    )
    if (!doesPasswordMatches) throw new InvalidCredentialsError()

    return { user }
  }
}
