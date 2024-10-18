import { GetMetricsByUserUseCase } from '../user'
import { CheckInPrismaRepository } from '@/repositories'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new CheckInPrismaRepository()
  const useCase = new GetMetricsByUserUseCase(checkInsRepository)

  return useCase
}
