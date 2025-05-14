import { User } from '../models/user.model'
import { PaginationResult, QueryPaginate } from '@src/types'
import { Repository } from '@src/types/baseRepository'

export class UserRepository extends Repository {
  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<User>> {
    return await this.paginate<User>({
      queryPaginate,
      getData: async () => await User.findAllPaginate(queryPaginate.page, queryPaginate.limit),
      getTotal: async () => await User.count()
    })
  }

  async findById (id: number): Promise<User | null> {
    return await User.findById(id)
  }

  async findByEmail (email: string): Promise<User | null> {
    return await User.findByEmail(email)
  }

  async findByUsername (username: string): Promise<User | null> {
    return await User.findByUsername(username)
  }

  async create (data: any): Promise<User> {
    return await User.create(data)
  }

  async update (id: number, data: any): Promise<User | null> {
    return await User.update(id, data)
  }

  async delete (id: number): Promise<User | null> {
    return await User.delete(id)
  }
}
