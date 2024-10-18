import { GymPrismaRepository } from '@/repositories'
import { RegisterGymUseCase } from '@/usecases/gym'

export function makeRegisterGymUseCase() {
  const gymsRepository = new GymPrismaRepository()
  const useCase = new RegisterGymUseCase(gymsRepository)

  return useCase
}
