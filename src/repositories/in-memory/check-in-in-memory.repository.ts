import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { CheckInRepository } from '../check-in.repository'

export class CheckInInMemoryRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex(
      (checkInUnit) => checkInUnit.id === checkIn.id,
    )

    if (checkInIndex > 0) this.items[checkInIndex] = checkIn

    return checkIn
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((checkIn) => checkIn.id === id)
    return checkIn || null
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: data.id ?? 'check-in-id',
      gymId: data.gymId,
      userId: data.userId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date(),
    }
    this.items.push(checkIn)

    return checkIn
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((checkIn) => checkIn.userId === userId).length
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.userId === userId && isOnSameDate
    })

    return checkIn || null
  }

  async findManyCheckInsByUserId(
    userId: string,
    page: number,
  ): Promise<CheckIn[]> {
    return this.items
      .filter((checkIn) => checkIn.userId === userId)
      .slice((page - 1) * 10, page * 10)
  }
}
