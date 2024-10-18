import { prisma } from '@/lib/prisma'
import { Gym } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms.repository'

export class GymPrismaRepository implements GymsRepository {
  async create(data: Gym): Promise<Gym> {
    const gymCreated = await prisma.gym.create({ data })
    return gymCreated
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({ where: { id } })
    return gym
  }

  async searchMany(search: string, page: number): Promise<Gym[]> {
    const gym = await prisma.gym.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    return gym
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE (
        6371 * acos(
          cos( radians(${latitude}) ) * cos( radians( latitude ) ) *
          cos( radians( longitude ) - radians(${longitude}) ) +
          sin( radians(${latitude}) ) * sin( radians( latitude ) )
        )
      ) <= 10
    `

    return gyms
  }
}
