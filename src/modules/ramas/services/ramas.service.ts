// services/ramas.service.ts
import { RamasRepository } from '../repositories/ramas.repository'
import { Rama } from '../interfaces/ramas.interface'

export class RamasService {
  private readonly ramasRepository = new RamasRepository()

  // Método para obtener las ramas paginadas
  async getRamas (page: number, limit: number): Promise<{ data: Rama[], pagination: { currentPage: number, totalPages: number, totalItems: number } }> {
    return await this.ramasRepository.getRamas(page, limit)
  }

  // Métodos para manejar ramas (crear, actualizar, eliminar, etc.)
}
