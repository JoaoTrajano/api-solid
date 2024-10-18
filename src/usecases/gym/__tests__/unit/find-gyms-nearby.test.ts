import { expect, it, describe, beforeEach } from 'vitest'

import { FindGymsNearBy } from '@/usecases/gym'
import { GymsInMemoryRepository } from '@/repositories/in-memory'

let gymsInMemoryRepository: GymsInMemoryRepository
let sut: FindGymsNearBy

describe('Find Gyms nearby use case', () => {
  beforeEach(() => {
    gymsInMemoryRepository = new GymsInMemoryRepository()
    sut = new FindGymsNearBy(gymsInMemoryRepository)
  })

  it('should be able to return gyms within 10 kilometers ', async () => {
    await gymsInMemoryRepository.create({
      name: 'Near Gym',
      description: 'Gym of the Jhon Doe Power',
      phone: '',
      latitude: -23.4099604,
      longitude: -47.3804479,
    })

    await gymsInMemoryRepository.create({
      name: 'Fear Gym',
      description: 'Gym of the Jhon Doe Power',
      phone: '',
      latitude: 19.5090208,
      longitude: -40.6639687,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.4099604,
      userLongitude: -47.3804479,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })])
  })
})
