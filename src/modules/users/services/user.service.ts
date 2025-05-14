import { PaginationResult, QueryPaginate } from '@src/types'
import { ExceptionBadFormatField } from '@src/types/baseExceptionBadFormatField'
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
    if ((await this.userRepository.findByEmail(data.email as string)) != null) {
      throw new ExceptionBadFormatField('Email ya existe')
    }
    if ((await this.userRepository.findByUsername(data.username as string)) != null) {
      throw new ExceptionBadFormatField('Username ya existe')
    }

    return await this.userRepository.create(data)
  }

  async update (id: number, data: Partial<UserInterface>): Promise<UserInterface | null> {
    return await this.userRepository.update(id, data)
  }

  async delete (id: number): Promise<UserInterface | null> {
    return await this.userRepository.delete(id)
  }
}
