// models/ramas.model.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const RamasModel = prisma.rama // Accediendo a la tabla `rama` en Prisma

export async function countRamas (): Promise<number> {
  return await prisma.rama.count()
}

export async function getRamas (skip: number, take: number): Promise<any> {
  return await prisma.rama.findMany({
    skip,
    take,
    where: { borrado: false },
    orderBy: { id: 'asc' }
  })
}
