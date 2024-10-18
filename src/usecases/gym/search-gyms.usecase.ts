import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms.repository'

export type SearchGymsUseCaseInput = {
  search: string
  page: number
}

export type SearchGymsUseCaseOutput = { gyms: Gym[] }

export class SearchGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute(
    input: SearchGymsUseCaseInput,
  ): Promise<SearchGymsUseCaseOutput> {
    const gyms = await this.gymsRepository.searchMany(input.search, input.page)

    return { gyms }
  }
}
