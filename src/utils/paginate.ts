// utils/paginate.ts
import { PrismaClient } from '@prisma/client'
import { QueryPaginate, PaginationResult } from '@src/types'

const prisma = new PrismaClient()

export async function paginate<T> (
  model: keyof typeof prisma,
  queryPaginate: QueryPaginate
): Promise<PaginationResult<T>> {
  const skip = (queryPaginate.page - 1) * queryPaginate.limit
  const totalItems = await (prisma[model] as any).count({ where: queryPaginate.where })
  const totalPages = Math.ceil(totalItems / queryPaginate.limit)

  const data = await (prisma[model] as any).findMany({
    skip,
    take: queryPaginate.limit,
    where: queryPaginate.where,
    orderBy: queryPaginate.orderBy
  })

  return {
    data,
    pagination: {
      currentPage: queryPaginate.page,
      totalPages,
      totalItems,
      limit: queryPaginate.limit
    }
  }
}
