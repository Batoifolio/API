// services/ramas.service.ts
import { PaginationResult, QueryPaginate } from '@src/types'
import { RamasRepository } from '../repositories/ramas.repository'
import { Rama } from '../interfaces/ramas.interface'

export class RamasService {
  private readonly ramasRepository = new RamasRepository()

  // Método para obtener las ramas paginadas
  async getRamas (queryPaginate: QueryPaginate): Promise<PaginationResult<Rama>> {
    return await this.ramasRepository.getRamas(queryPaginate)
  }

  // Métodos para manejar ramas (crear, actualizar, eliminar, etc.)
}
