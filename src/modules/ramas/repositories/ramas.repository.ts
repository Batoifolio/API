// repositories/ramas.repository.ts
import { Rama } from '@src/modules/ramas/models/ramas.model'
import { PaginationResult, QueryPaginate } from '@src/types'
import { Repository } from '@src/types/baseRepository'

export class RamasRepository extends Repository {
  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<Rama>> {
    return await this.paginate<Rama>({
      queryPaginate,
      getData: async () => await Rama.findAllPaginate(queryPaginate.page, queryPaginate.limit),
      getTotal: async () => await Rama.count()
    })
  }

  async findById (id: number): Promise<Rama | null> {
    return await Rama.findById(id)
  }

  async create (nombre: string): Promise<Rama> {
    return await Rama.create(nombre)
  }

  async update (id: number, nombre: string): Promise<Rama | null> {
    return await Rama.update(id, nombre)
  }

  async delete (id: number): Promise<Rama | null> {
    return await Rama.delete(id)
  }
}
