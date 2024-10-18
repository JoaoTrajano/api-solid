import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'

import { CheckInInMemoryRepository } from '@/repositories/in-memory'

import { ValidateCheckinUseCase } from '../../validate-check-in.usecase'
import { ResourceNotFoundError } from '@/errors'

let checkInRepository: CheckInInMemoryRepository

let sut: ValidateCheckinUseCase

describe('Validate check-in use case', () => {
  beforeEach(() => {
    checkInRepository = new CheckInInMemoryRepository()
    sut = new ValidateCheckinUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able validate check-in on the gym', async () => {
    const checkInCreated = await checkInRepository.create({
      id: 'check-in-id-1',
      gymId: 'gym-1',
      userId: 'user-id',
    })

    await sut.execute({
      checkInId: 'check-in-id-1',
    })

    expect(checkInCreated.validatedAt).toEqual(expect.any(Date))
  })

  it('should not be possible to validate non-existent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'check-in-id-1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be possible to validate check-in 20 minutes later', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 18, 10, 0))

    await checkInRepository.create({
      id: 'check-in-id-1',
      gymId: 'gym-1',
      userId: 'user-id',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: 'check-in-id-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
