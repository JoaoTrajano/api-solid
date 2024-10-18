import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user.repository'

export class UserPrismaRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const userCreated = prisma.user.create({ data })
    return userCreated
  }

  async findByEmail(email: string) {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
