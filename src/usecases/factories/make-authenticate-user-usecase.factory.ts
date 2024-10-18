import { AuthenticateUseCase } from '../authentication'
import { UserPrismaRepository } from '@/repositories/prisma'

export function makeAuthenticateUseCase() {
  const userRepository = new UserPrismaRepository()
  const authenticateUseCase = new AuthenticateUseCase(userRepository)

  return authenticateUseCase
}
