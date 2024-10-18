import { GymPrismaRepository } from '@/repositories'
import { SearchGymsUseCase } from '../gym'

export function makeSearchGymsUseCase() {
  const gymsRepository = new GymPrismaRepository()
  const useCase = new SearchGymsUseCase(gymsRepository)

  return useCase
}
