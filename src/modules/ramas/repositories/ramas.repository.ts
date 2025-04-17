// repositories/ramas.repository.ts
import { countRamas, getRamas } from '@src/modules/ramas/models/ramas.model'
import { PaginationResult, QueryPaginate } from '@src/types'
import { Repository } from '@src/types/baseRepository'
import { Rama } from '../interfaces/ramas.interface'

export class RamasRepository extends Repository {
  async getRamas (queryPaginate: QueryPaginate): Promise<PaginationResult<Rama>> {
    return await this.paginate<Rama>({
      queryPaginate,
      getData: getRamas,
      getTotal: countRamas
    })
  }
}
