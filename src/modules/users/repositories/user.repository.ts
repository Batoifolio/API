import { User } from '../models/user.model'
import { Curriculum } from '../interfaces/user.interface'
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

  async filterAll (queryPaginate: QueryPaginate, where: any): Promise<PaginationResult<User>> {
    return await this.paginate<User>({
      queryPaginate,
      getData: async () => await User.filterAllPaginate(queryPaginate.page, queryPaginate.limit, where),
      getTotal: async () => await User.filterCount(where)
    })
  }

  async findById (id: number): Promise<User | null> {
    return await User.findById(id)
  }

  async getRoleById (id: number): Promise<string | null> {
    return await User.getRoleById(id)
  }

  async findByEmail (email: string): Promise<User | null> {
    return await User.findByEmail(email)
  }

  async emailUnique (email: string): Promise<User | null> {
    return await User.emailUnique(email)
  }

  async findByUsername (username: string): Promise<User | null> {
    return await User.findByUsername(username)
  }

  async usernameUnique (username: string): Promise<User | null> {
    return await User.usernameUnique(username)
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

  async findByIdCurriculum (id: number): Promise<Curriculum | null> {
    return await User.findByIdCurriculum(id)
  }

  async updateCurriculum (id: number, data: any): Promise<Curriculum | null> {
    return await User.updateCurriculum(id, data)
  }
}
