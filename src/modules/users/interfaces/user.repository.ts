import { User } from '../models/user.model'

export interface IUserRepository {
  findAll: () => Promise<User[]>
  findById: (id: number) => Promise<User | null>
  create: (user: Partial<User>) => Promise<User>
  update: (id: number, data: Partial<User>) => Promise<User>
  delete: (id: number) => Promise<void>
}
