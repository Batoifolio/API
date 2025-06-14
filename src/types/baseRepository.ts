import { PaginationResult, PaginateOptions } from '@src/types'

export abstract class Repository {
  protected async paginate<T>({
    queryPaginate = { page: 1, limit: 10 },
    getData,
    getTotal
  }: PaginateOptions<T>): Promise<PaginationResult<T>> {
    const skip = (queryPaginate.page - 1) * queryPaginate.limit
    const totalItems = await getTotal()
    const totalPages = Math.ceil(totalItems / queryPaginate.limit)
    const data = await getData(skip, queryPaginate.limit)

    return {
      data,
      pagination: {
        currentPage: (queryPaginate.page === 0) ? 1 : queryPaginate.page,
        totalPages,
        totalItems,
        limit: queryPaginate.limit
      }
    }
  }
}
