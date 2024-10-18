import { expect, it, describe, beforeEach } from 'vitest'

import { CheckInInMemoryRepository } from '@/repositories/in-memory'
import { GetMetricsByUserUseCase } from '../../get-metrics-by-user.usecase'

let checkInsRepository: CheckInInMemoryRepository
let sut: GetMetricsByUserUseCase

describe('Get metrics by user use case', () => {
  beforeEach(() => {
    checkInsRepository = new CheckInInMemoryRepository()
    sut = new GetMetricsByUserUseCase(checkInsRepository)
  })

  it('should return be able to get checki-ins count from metrics', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gymId: `gym-id-${i}`,
        userId: 'user-id-1',
      })
    }

    const { totalCheckIns } = await sut.execute({
      userId: 'user-id-1',
    })

    expect(totalCheckIns).toEqual(22)
  })
})
