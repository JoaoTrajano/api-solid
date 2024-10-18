import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'

import { FindManyNearbyParams, GymsRepository } from '../gyms.repository'

import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

const MAX_NEAR_DISTANCE = 10

export class GymsInMemoryRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ? data.description : null,
      phone: data.phone ? data.phone : null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    return this.items.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { ...params },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      return distance < MAX_NEAR_DISTANCE
    })
  }

  async searchMany(search: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((gym) => gym.name.includes(search))
      .slice((page - 1) * 10, page * 10)
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => {
      return gym.id === id
    })

    return gym || null
  }
}
