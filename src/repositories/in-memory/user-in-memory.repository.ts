import bcrypt from 'bcryptjs'

import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user.repository'

export class UserInMemoryRepository implements UserRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-id-1',
      name: data.name,
      email: data.email,
      passwordHash: await bcrypt.hash(data.passwordHash, 6),
      createdAt: new Date(),
    }
    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    return user || null
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    return user || null
  }
}
