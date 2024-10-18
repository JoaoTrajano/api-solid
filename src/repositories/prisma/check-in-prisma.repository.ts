import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'
import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../check-in.repository'

export class CheckInPrismaRepository implements CheckInRepository {
  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInUpdated = await prisma.checkIn.update({
      where: { id: checkIn.id },
      data: checkIn,
    })

    return checkInUpdated
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkInCreated = prisma.checkIn.create({ data })
    return checkInCreated
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id },
    })

    return checkIn
  }

  async countByUserId(userId: string): Promise<number> {
    return await prisma.checkIn.count({ where: { userId } })
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async findManyCheckInsByUserId(
    userId: string,
    page: number,
  ): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        userId,
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    return checkIns
  }
}
