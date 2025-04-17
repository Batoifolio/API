// models/ramas.model.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const RamasModel = prisma.rama // Accediendo a la tabla `rama` en Prisma
