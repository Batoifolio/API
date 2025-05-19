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

  async findByEmail (email: string): Promise<UserInterface | null> {
    return await this.userRepository.findByEmail(email)
  }

  async findByUsername (username: string): Promise<UserInterface | null> {
    return await this.userRepository.findByUsername(username)
  }

  async create (data: Partial<UserInterface>): Promise<UserInterface> {
    if ((await this.userRepository.emailUnique(data.email as string)) != null) {
      throw new ExceptionBadFormatField('Email ya existe')
    }
    if ((await this.userRepository.usernameUnique(data.username as string)) != null) {
      throw new ExceptionBadFormatField('Username ya existe')
    }

    const nameRegex = /^[a-zA-Z\s]+$/
    if (!nameRegex.test(data.nombre as string)) {
      throw new ExceptionBadFormatField('El nombre solo puede contener letras y espacios')
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{4,}$/
    if (!passwordRegex.test(data.password as string)) {
      throw new ExceptionBadFormatField('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número')
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
