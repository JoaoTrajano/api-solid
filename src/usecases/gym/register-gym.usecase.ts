import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms.repository'

export type RegisterGymUseCaseInput = {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export type RegisterGymUseCaseOutput = { gym: Gym }

export class RegisterGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute(
    input: RegisterGymUseCaseInput,
  ): Promise<RegisterGymUseCaseOutput> {
    const gymCreated = await this.gymsRepository.create({ ...input })

    return { gym: gymCreated }
  }
}
