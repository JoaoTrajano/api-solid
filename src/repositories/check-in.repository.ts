import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
  save(checkIn: CheckIn): Promise<CheckIn>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyCheckInsByUserId(userId: string, page: number): Promise<CheckIn[]>
}
