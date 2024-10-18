import { FindGymsNearBy } from '@/usecases/gym'
import { GymPrismaRepository } from '@/repositories'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new GymPrismaRepository()
  const useCase = new FindGymsNearBy(gymsRepository)

  return useCase
}
