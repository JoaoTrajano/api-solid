import { expect, it, describe, beforeEach } from 'vitest'

import { AuthenticateUseCase } from '@/usecases/authentication'
import { UserInMemoryRepository } from '@/repositories/in-memory/user-in-memory.repository'

import { InvalidCredentialsError } from '@/errors'

let userRepository: UserInMemoryRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(async () => {
    userRepository = new UserInMemoryRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'jhondoe-wrong-email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      passwordHash: '123456',
    })

    expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      passwordHash: '123456',
    })

    const { user } = await sut.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
