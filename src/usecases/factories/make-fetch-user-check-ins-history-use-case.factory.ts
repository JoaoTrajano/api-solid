import { CheckInPrismaRepository } from '@/repositories'
import { FetchUserCheckInsHistoryUseCase } from '@/usecases/checkIn'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new CheckInPrismaRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
