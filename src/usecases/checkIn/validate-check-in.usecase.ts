import dayjs from 'dayjs'
import { CheckIn } from '@prisma/client'

import { ResourceNotFoundError } from '@/errors'
import { CheckInRepository } from '@/repositories/check-in.repository'

const LIMIT_TIME_IN_MINUTES_TO_HAVE_CHEKING = 20

export type ValidateCheckinUseCaseInput = {
  checkInId: string
}

export type ValidateCheckinUseCaseOutput = { checkIn: CheckIn }

export class ValidateCheckinUseCase {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute(
    input: ValidateCheckinUseCaseInput,
  ): Promise<ValidateCheckinUseCaseOutput> {
    let checkIn = await this.checkInRepository.findById(input.checkInId)
    if (!checkIn) throw new ResourceNotFoundError()

    const diferenceInMinutes = dayjs(new Date()).diff(
      checkIn.createdAt,
      'minutes',
    )

    if (diferenceInMinutes > LIMIT_TIME_IN_MINUTES_TO_HAVE_CHEKING)
      throw new Error()

    checkIn.validatedAt = new Date()
    checkIn = await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
