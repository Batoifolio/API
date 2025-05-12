// services/ramas.service.ts
import { PaginationResult, QueryPaginate } from '@src/types'
import { RamasRepository } from '../repositories/ramas.repository'
import { RamaInterface } from '../interfaces/ramas.interface'

export class RamasService {
  private readonly ramasRepository = new RamasRepository()

  // Método para obtener las ramas paginadas
  async getRamas (queryPaginate: QueryPaginate): Promise<PaginationResult<RamaInterface>> {
    return await this.ramasRepository.getRamas(queryPaginate)
  }

  async getRamaById (id: number): Promise<RamaInterface | null> {
    return await this.ramasRepository.getRamaById(id)
  }

  async createRama (nombre: string): Promise<RamaInterface> {
    return await this.ramasRepository.createRama(nombre)
  }

  async updateRama (id: number, nombre: string): Promise<RamaInterface | null> {
    return await this.ramasRepository.updateRama(id, nombre)
  }

  async deleteRama (id: number): Promise<RamaInterface | null> {
    return await this.ramasRepository.deleteRama(id)
  }
  // Métodos para manejar ramas (crear, actualizar, eliminar, etc.)
}
