// repositories/grado.repository.ts
import { Grado } from '@src/modules/grados/models/grado.model'
import { PaginationResult, QueryPaginate } from '@src/types'
import { Repository } from '@src/types/baseRepository'

export class GradoRepository extends Repository {
  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<Grado>> {
    return await this.paginate<Grado>({
      queryPaginate,
      getData: async () => await Grado.findAllPaginate(queryPaginate.page, queryPaginate.limit),
      getTotal: async () => await Grado.count()
    })
  }

  async findById (id: number): Promise<Grado | null> {
    return await Grado.findById(id)
  }

  async create (data: any): Promise<Grado> {
    return await Grado.create(data)
  }

  async update (id: number, data: any): Promise<Grado | null> {
    return await Grado.update(id, data)
  }

  async delete (id: number): Promise<Grado | null> {
    return await Grado.delete(id)
  }
}
