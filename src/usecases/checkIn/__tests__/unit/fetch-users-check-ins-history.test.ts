import { expect, it, describe, beforeEach } from 'vitest'

import { FetchUserCheckInsHistoryUseCase } from '@/usecases/checkIn'
import { CheckInInMemoryRepository } from '@/repositories/in-memory'

let checkInRepository: CheckInInMemoryRepository

let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check ins History use case', () => {
  beforeEach(() => {
    checkInRepository = new CheckInInMemoryRepository()

    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  it('should be able returning many check ins from the user ', async () => {
    await checkInRepository.create({
      gymId: 'gym-id-1',
      userId: 'user-id-1',
    })
    await checkInRepository.create({
      gymId: 'gym-id-2',
      userId: 'user-id-1',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-id-1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-id-1' }),
      expect.objectContaining({ gymId: 'gym-id-2' }),
    ])
  })

  it('should be able to return many paged user check-ins ', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gymId: `gym-id-${i}`,
        userId: 'user-id-1',
      })
    }
    const { checkIns } = await sut.execute({
      userId: 'user-id-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(10)
  })
})
