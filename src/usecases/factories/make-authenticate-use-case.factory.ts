import { UserPrismaRepository } from '@/repositories/prisma'
import { AuthenticateUseCase } from '../authentication'

export function makeAuthenticateUseCase() {
  const usersRepository = new UserPrismaRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
