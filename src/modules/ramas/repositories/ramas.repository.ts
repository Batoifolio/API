// repositories/ramas.repository.ts
import { PrismaClient } from '@prisma/client'
import { Rama } from '../interfaces/ramas.interface'

const prisma = new PrismaClient()

export class RamasRepository {
  // Método para obtener las ramas con paginación
  async getRamas (page: number = 1, limit: number = 10): Promise<{ data: Rama[], pagination: { currentPage: number, totalPages: number, totalItems: number } }> {
    const skip = (page - 1) * limit

    // Obtener ramas con paginación
    const ramas = await prisma.rama.findMany({
      skip,
      take: limit,
      where: { borrado: false } // Solo ramas no borradas
    })

    // Obtener el total de ramas
    const totalItems = await prisma.rama.count({
      where: { borrado: false }
    })

    const totalPages = Math.ceil(totalItems / limit)

    return {
      data: ramas,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems
      }
    }
  }

  // Otros métodos como crear, actualizar, eliminar, etc.
}
