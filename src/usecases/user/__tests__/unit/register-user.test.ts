import { expect, it, describe, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUserUseCase } from '@/usecases/user'

import { UserInMemoryRepository } from '@/repositories/in-memory'

let userRepository: UserInMemoryRepository
let sut: RegisterUserUseCase

describe('Register use case', () => {
  beforeEach(() => {
    userRepository = new UserInMemoryRepository()
    sut = new RegisterUserUseCase(userRepository)
  })

  it('should register user', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should is valid hash password', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe-1@example.com',
      password: '123456',
    })

    const isValidPassword = compare('12356', user.passwordHash)
    expect(isValidPassword).toBeTruthy()
  })

  it('should not register user with the same email', async () => {
    await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    const email = 'jhondoe@example.com'

    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
