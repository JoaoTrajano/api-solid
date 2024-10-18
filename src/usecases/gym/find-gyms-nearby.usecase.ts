import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms.repository'

export type FindGymsNearByInput = {
  userLatitude: number
  userLongitude: number
}

export type FindGymsNearByOutput = { gyms: Gym[] }

export class FindGymsNearBy {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute(input: FindGymsNearByInput): Promise<FindGymsNearByOutput> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: input.userLatitude,
      longitude: input.userLongitude,
    })

    return { gyms }
  }
}
