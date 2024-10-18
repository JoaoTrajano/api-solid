import { expect, it, describe, beforeEach } from 'vitest'

import { ResourceNotFoundError } from '@/errors'
import { GetProfileUserUseCase } from '@/usecases/user'
import { UserInMemoryRepository } from '@/repositories/in-memory'

let userRepository: UserInMemoryRepository
let sut: GetProfileUserUseCase

describe('Get profile user use case', () => {
  beforeEach(() => {
    userRepository = new UserInMemoryRepository()
    sut = new GetProfileUserUseCase(userRepository)
  })

  it('should return profile user', async () => {
    const userCreated = await userRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      passwordHash: '123456',
    })

    const { user } = await sut.execute({
      userId: userCreated.id,
    })

    expect(user.name).toEqual('Jhon Doe')
  })

  it('should not get profile user with wrong id', async () => {
    await userRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      passwordHash: '123456',
    })

    expect(() =>
      sut.execute({
        userId: 'user-id-not-exist',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
