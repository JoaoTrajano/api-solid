import { RegisterUserUseCase } from '../user'
import { UserPrismaRepository } from '@/repositories/prisma'

export function makeRegisterUserUseCase() {
  const userRepository = new UserPrismaRepository()
  const registerUserUseCase = new RegisterUserUseCase(userRepository)

  return registerUserUseCase
}
