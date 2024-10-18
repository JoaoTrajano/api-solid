import { expect, it, describe, beforeEach } from 'vitest'

import { SearchGymsUseCase } from '@/usecases/gym'
import { GymsInMemoryRepository } from '@/repositories/in-memory'

let gymsInMemoryRepository: GymsInMemoryRepository
let sut: SearchGymsUseCase

describe('Search Gyms use case', () => {
  beforeEach(() => {
    gymsInMemoryRepository = new GymsInMemoryRepository()
    sut = new SearchGymsUseCase(gymsInMemoryRepository)
  })

  it('should be able returning many check ins from the user ', async () => {
    await gymsInMemoryRepository.create({
      name: 'Gym of the Jhon Doe',
      description: 'Gym of the Jhon Doe Power',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    await gymsInMemoryRepository.create({
      name: 'Gym of the Jhon Doe and Fulano de Tal',
      description: 'Gym of the Jhon Doe Power',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({ search: 'Jhon', page: 1 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Gym of the Jhon Doe' }),
      expect.objectContaining({
        name: 'Gym of the Jhon Doe and Fulano de Tal',
      }),
    ])
  })

  it('should be able to return many paged gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsInMemoryRepository.create({
        name: `Gym of the Jhon Doe ${i}`,
        description: 'Gym of the Jhon Doe Power',
        phone: '',
        latitude: 0,
        longitude: 0,
      })
    }
    const { gyms } = await sut.execute({ search: 'Jhon', page: 1 })

    expect(gyms).toHaveLength(10)
  })
})
