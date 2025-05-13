import { PaginationResult, QueryPaginate } from '@src/types'
import { UserRepository } from '../repositories/user.repository'
import { UserInterface } from '../interfaces/user.interface'

export class UserService {
  private readonly userRepository = new UserRepository()

  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<UserInterface>> {
    return await this.userRepository.findAll(queryPaginate)
  }

  async findById (id: number): Promise<UserInterface | null> {
    return await this.userRepository.findById(id)
  }

  async create (data: Partial<UserInterface>): Promise<UserInterface> {
    return await this.userRepository.create(data)
  }

  async update (id: number, data: Partial<UserInterface>): Promise<UserInterface | null> {
    return await this.userRepository.update(id, data)
  }

  async delete (id: number): Promise<UserInterface | null> {
    return await this.userRepository.delete(id)
  }
}
