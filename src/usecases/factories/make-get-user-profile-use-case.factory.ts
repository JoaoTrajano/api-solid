import { UserPrismaRepository } from '@/repositories'
import { GetProfileUserUseCase } from '../user'

export function makeGetUserProfileUseCase() {
  const usersRepository = new UserPrismaRepository()
  const useCase = new GetProfileUserUseCase(usersRepository)

  return useCase
}
