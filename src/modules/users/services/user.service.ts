import { IUserRepository } from '../interfaces/user.repository'
import { User } from '../models/user.model'

export class UserService {
  constructor (private readonly userRepository: IUserRepository) { }

  async getAll (): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async getById (id: number): Promise<User | null> {
    return await this.userRepository.findById(id)
  }

  async register (data: Partial<User>): Promise<User> {
    return await this.userRepository.create(data)
  }

  async update (id: number, data: Partial<User>): Promise<User> {
    return await this.userRepository.update(id, data)
  }

  async remove (id: number): Promise<void> {
    return await this.userRepository.delete(id)
  }
}
