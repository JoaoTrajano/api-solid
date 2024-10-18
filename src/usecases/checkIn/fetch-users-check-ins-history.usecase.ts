import { CheckIn } from '@prisma/client'

import { CheckInRepository } from '@/repositories/check-in.repository'

export type FetchUserCheckInsHistoryUseCaseInput = {
  userId: string
  page: number
}

export type FetchUserCheckInsHistoryUseCaseOutput = { checkIns: CheckIn[] }

export class FetchUserCheckInsHistoryUseCase {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute(
    input: FetchUserCheckInsHistoryUseCaseInput,
  ): Promise<FetchUserCheckInsHistoryUseCaseOutput> {
    const checkIns = await this.checkInRepository.findManyCheckInsByUserId(
      input.userId,
      input.page,
    )

    return { checkIns }
  }
}
