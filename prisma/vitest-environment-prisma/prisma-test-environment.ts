import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

function generateDatabaseURL(schema: string): string {
  if (!process.env.DATABASE_URL)
    throw new Error('Please provide a DATABASE_URL environment variable.')

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup() {
    const schema = randomUUID()
    const url = generateDatabaseURL(schema)

    process.env.DATABASE_URL = url

    execSync('npx prisma migrate deploy')
    return {
      async teardown() {
        const prisma = new PrismaClient()
        await prisma.$queryRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
