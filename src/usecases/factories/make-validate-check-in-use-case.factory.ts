import { CheckInPrismaRepository } from '@/repositories'
import { ValidateCheckinUseCase } from '../checkIn/validate-check-in.usecase'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new CheckInPrismaRepository()
  const useCase = new ValidateCheckinUseCase(checkInsRepository)

  return useCase
}
