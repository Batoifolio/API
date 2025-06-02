// repositories/empresa.repository.ts
import { Empresa } from '@src/modules/empresas/models/empresa.model'
import { PaginationResult, QueryPaginate } from '@src/types'
import { Repository } from '@src/types/baseRepository'

export class EmpresaRepository extends Repository {
  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<Empresa>> {
    return await this.paginate<Empresa>({
      queryPaginate,
      getData: async () => await Empresa.findAllPaginate(queryPaginate.page, queryPaginate.limit),
      getTotal: async () => await Empresa.count()
    })
  }

  async findById (id: number): Promise<Empresa | null> {
    return await Empresa.findById(id)
  }

  async create (data: any): Promise<Empresa> {
    return await Empresa.create(data)
  }

  async update (id: number, data: any): Promise<Empresa | null> {
    return await Empresa.update(id, data)
  }

  async delete (id: number): Promise<Empresa | null> {
    return await Empresa.delete(id)
  }
}
