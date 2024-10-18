import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'

import {
  CheckInInMemoryRepository,
  GymsInMemoryRepository,
} from '@/repositories/in-memory'

import { RegisterCheckInUseCase } from '../../register-check-in.usecase'

let gymsRepository: GymsInMemoryRepository
let checkInRepository: CheckInInMemoryRepository

let sut: RegisterCheckInUseCase

describe('Check in use case', () => {
  beforeEach(() => {
    gymsRepository = new GymsInMemoryRepository()
    checkInRepository = new CheckInInMemoryRepository()

    sut = new RegisterCheckInUseCase(gymsRepository, checkInRepository)

    gymsRepository.create({
      id: 'gym-1',
      name: '',
      description: '',
      phone: '',
      latitude: new Decimal(-23.4099604),
      longitude: new Decimal(-47.3804479),
    })
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should register check in', async () => {
    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-id',
      userLatitude: -23.4099604,
      userLongitude: -47.3804479,
    })

    expect(checkInRepository.items[0].id).toEqual('check-in-id')
  })

  it('should not able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-id',
      userLatitude: -23.4099604,
      userLongitude: -47.3804479,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-id',
        userLatitude: -23.4099604,
        userLongitude: -47.3804479,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should able to check in twice in the different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-id',
      userLatitude: -23.4099604,
      userLongitude: -47.3804479,
    })

    vi.setSystemTime(new Date(2024, 0, 2, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-id',
      userLatitude: -23.4099604,
      userLongitude: -47.3804479,
    })
    expect(checkInRepository.items[1].id).toEqual('check-in-id')
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-2',
      name: '',
      description: '',
      phone: '',
      latitude: new Decimal(-23.3460696),
      longitude: new Decimal(-47.2866143),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-2',
        userId: 'user-id',
        userLatitude: -23.4099604,
        userLongitude: -47.3804479,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
