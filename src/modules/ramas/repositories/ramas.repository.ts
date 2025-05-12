// repositories/ramas.repository.ts
import { Rama } from '@src/modules/ramas/models/ramas.model'
import { PaginationResult, QueryPaginate } from '@src/types'
import { Repository } from '@src/types/baseRepository'
// import { Rama } from '../interfaces/ramas.interface'

export class RamasRepository extends Repository {
  async getRamas (queryPaginate: QueryPaginate): Promise<PaginationResult<Rama>> {
    return await this.paginate<Rama>({
      queryPaginate,
      getData: async () => await Rama.getRamasPaginate(queryPaginate.page, queryPaginate.limit),
      getTotal: async () => await Rama.countRamas()
    })
  }

  async getRamaById (id: number): Promise<Rama | null> {
    return await Rama.getRamaById(id)
  }

  async createRama (nombre: string): Promise<Rama> {
    return await Rama.createRama(nombre)
  }

  async updateRama (id: number, nombre: string): Promise<Rama | null> {
    return await Rama.updateRama(id, nombre)
  }

  async deleteRama (id: number): Promise<Rama | null> {
    return await Rama.deleteRama(id)
  }
}
