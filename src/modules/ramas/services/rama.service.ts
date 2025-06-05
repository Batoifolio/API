// services/ramas.service.ts
import { PaginationResult, QueryPaginate } from '@src/types'
import { RamasRepository } from '../repositories/ramas.repository'
import { RamaInterface } from '../interfaces/rama.interface'

export class RamasService {
  private readonly ramasRepository = new RamasRepository()

  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<RamaInterface>> {
    return await this.ramasRepository.findAll(queryPaginate)
  }

  async findById (id: number): Promise<RamaInterface | null> {
    return await this.ramasRepository.findById(id)
  }

  async create (nombre: string): Promise<RamaInterface> {
    return await this.ramasRepository.create(nombre)
  }

  async update (id: number, nombre: string): Promise<RamaInterface | null> {
    return await this.ramasRepository.update(id, nombre)
  }

  async delete (id: number): Promise<RamaInterface | null> {
    return await this.ramasRepository.delete(id)
  }
}
