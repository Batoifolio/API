// repositories/preferencia.repository.ts
import { Preferencia } from '@src/modules/preferencias/models/preferencia.model'
import { PaginationResult, QueryPaginate } from '@src/types'
import { Repository } from '@src/types/baseRepository'

export class PreferenciaRepository extends Repository {
  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<Preferencia>> {
    return await this.paginate<Preferencia>({
      queryPaginate,
      getData: async () => await Preferencia.findAllPaginate(queryPaginate.page, queryPaginate.limit),
      getTotal: async () => await Preferencia.count()
    })
  }

  async findById (id: number): Promise<Preferencia | null> {
    return await Preferencia.findById(id)
  }

  async create (data: any): Promise<Preferencia> {
    return await Preferencia.create(data)
  }

  async update (id: number, data: any): Promise<Preferencia | null> {
    return await Preferencia.update(id, data)
  }

  async delete (id: number): Promise<Preferencia | null> {
    return await Preferencia.delete(id)
  }
}
