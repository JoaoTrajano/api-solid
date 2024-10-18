import { RegisterCheckInUseCase } from '@/usecases/checkIn'
import {
  CheckInPrismaRepository,
  GymPrismaRepository,
} from '@/repositories/prisma'

export function makeRegisterCheckInUseCase() {
  const checkInsRepository = new CheckInPrismaRepository()
  const gymsRepository = new GymPrismaRepository()

  const useCase = new RegisterCheckInUseCase(gymsRepository, checkInsRepository)

  return useCase
}
