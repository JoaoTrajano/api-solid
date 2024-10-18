import { expect, it, describe, beforeEach } from 'vitest'

import { RegisterGymUseCase } from '@/usecases/gym'
import { GymsInMemoryRepository } from '@/repositories/in-memory'

let gymsInMemoryRepository: GymsInMemoryRepository
let sut: RegisterGymUseCase

describe('Register Gym use case', () => {
  beforeEach(() => {
    gymsInMemoryRepository = new GymsInMemoryRepository()
    sut = new RegisterGymUseCase(gymsInMemoryRepository)
  })

  it('should register Gym', async () => {
    const { gym } = await sut.execute({
      name: 'Gym of the Jhon Doe',
      description: 'Gym of the Jhon Doe Power',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
