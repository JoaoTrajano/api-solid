import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { UserRepository } from '@/repositories/user.repository'

export type RegisterUserUseCaseInput = {
  name: string
  email: string
  password: string
}

export type RegisterUserUseCaseOutput = { user: User }

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    input: RegisterUserUseCaseInput,
  ): Promise<RegisterUserUseCaseOutput> {
    const hasUserUsingEmail = await this.userRepository.findByEmail(input.email)

    if (hasUserUsingEmail) throw new Error('E-mail already registered')

    const passwordHash = await bcrypt.hash(input.password, 6)

    const userCreated = await this.userRepository.create({
      email: input.email,
      name: input.name,
      passwordHash,
    })

    return { user: userCreated }
  }
}
