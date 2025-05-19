// repositories/rol.repository.ts
import { Rol } from '@src/modules/rols/models/rol.model'
import { PaginationResult, QueryPaginate } from '@src/types'
import { Repository } from '@src/types/baseRepository'

export class RolRepository extends Repository {
  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<Rol>> {
    return await this.paginate<Rol>({
      queryPaginate,
      getData: async () => await Rol.findAllPaginate(queryPaginate.page, queryPaginate.limit),
      getTotal: async () => await Rol.count()
    })
  }

  async findById (id: number): Promise<Rol | null> {
    return await Rol.findById(id)
  }

  async create (data: any): Promise<Rol> {
    return await Rol.create(data)
  }

  async update (id: number, data: any): Promise<Rol | null> {
    return await Rol.update(id, data)
  }

  async delete (id: number): Promise<Rol | null> {
    return await Rol.delete(id)
  }
}
