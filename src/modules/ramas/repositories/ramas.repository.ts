// repositories/ramas.repository.ts
import { PaginationResult, QueryPaginate } from '@src/types'
import { paginate } from '@utils/paginate'
import { Rama } from '../interfaces/ramas.interface'

export class RamasRepository {
  async getRamas (queryPaginate: QueryPaginate): Promise<PaginationResult<Rama>> {
    return await paginate<Rama>('rama', queryPaginate)
  }
}
