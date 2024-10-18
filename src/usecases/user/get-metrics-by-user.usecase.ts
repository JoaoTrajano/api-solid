import { CheckInRepository } from '@/repositories/check-in.repository'

export type GetMetricsByUserUseCaseInput = {
  userId: string
}

export type GetMetricsByUserUseCaseOutput = { totalCheckIns: number }

export class GetMetricsByUserUseCase {
  constructor(private readonly checkInRepository: CheckInRepository) {}

  async execute(
    input: GetMetricsByUserUseCaseInput,
  ): Promise<GetMetricsByUserUseCaseOutput> {
    const totalCheckIns = await this.checkInRepository.countByUserId(
      input.userId,
    )

    return { totalCheckIns }
  }
}
