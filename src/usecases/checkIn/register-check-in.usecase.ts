import { CheckIn } from '@prisma/client'

import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

import { CheckInRepository } from '@/repositories/check-in.repository'
import { GymsRepository } from '@/repositories/gyms.repository'

const MAX_DISTANCE_IN_KM = 0.1

export type RegisterCheckInUseCaseInput = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export type RegisterCheckInUseCaseOutput = { checkIn: CheckIn }

export class RegisterCheckInUseCase {
  constructor(
    private readonly gymsRepository: GymsRepository,
    private readonly checkInRepository: CheckInRepository,
  ) {}

  async execute(
    input: RegisterCheckInUseCaseInput,
  ): Promise<RegisterCheckInUseCaseOutput> {
    const gym = await this.gymsRepository.findById(input.gymId)
    if (!gym) throw new Error()

    const hasCheckInInTheSameDay =
      await this.checkInRepository.findByUserIdOnDate(input.userId, new Date())
    if (hasCheckInInTheSameDay) throw new Error()

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: input.userLatitude,
        longitude: input.userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    if (distance > MAX_DISTANCE_IN_KM) throw new Error()

    const checkInCreated = await this.checkInRepository.create({
      gymId: input.gymId,
      userId: input.userId,
    })

    return { checkIn: checkInCreated }
  }
}
