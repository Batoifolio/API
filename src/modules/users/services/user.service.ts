import { PaginationResult, QueryPaginate } from '@src/types'
import { ExceptionBadFormatField } from '@src/types/baseExceptionBadFormatField'
import { UserRepository } from '../repositories/user.repository'
import { UserInterface, Curriculum, UserFilter } from '../interfaces/user.interface'
import { GradoService } from '@src/modules/grados/services/grado.service'
import { RamasService } from '@src/modules/ramas/services/rama.service'

export class UserService {
  private readonly userRepository = new UserRepository()
  private readonly gradoRepository = new GradoService()
  private readonly ramaRepository = new RamasService()

  async filterAll (queryPaginate: QueryPaginate, filter: UserFilter): Promise<PaginationResult<UserInterface>> {
    const where: any = {
      borrado: false
    }

    if (filter.nombre !== undefined && filter.nombre.trim() !== '') {
      where.OR = [
        { nombre: { contains: filter.nombre, mode: 'insensitive' } },
        { apellidos: { contains: filter.nombre, mode: 'insensitive' } }
      ]
    }

    if (filter.email !== undefined && filter.email.trim() !== '') {
      where.email = { contains: filter.email, mode: 'insensitive' }
    }

    if (filter.pueblo !== undefined && filter.pueblo.trim() !== '') {
      where.pueblo = { contains: filter.pueblo, mode: 'insensitive' }
    }

    const gradosIdsValidas = await this.gradoRepository.getAllIds()

    if (filter.gradoId !== undefined && gradosIdsValidas.includes(filter.gradoId)) {
      where.gradoId = filter.gradoId
    }

    const ramasIdsValidas = await this.ramaRepository.getAllIds()

    if (filter.ramaId !== undefined && ramasIdsValidas.includes(filter.ramaId)) {
      where.ramaId = filter.ramaId
    }

    return await this.userRepository.filterAll(queryPaginate, where)
  }

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

    await this.validated(data)

    return await this.userRepository.create(data)
  }

  async update (id: number, data: Partial<UserInterface>): Promise<UserInterface | null> {
    await this.validated(data)
    return await this.userRepository.update(id, data)
  }

  async delete (id: number): Promise<UserInterface | null> {
    return await this.userRepository.delete(id)
  }

  private async validated (data: Partial<UserInterface>): Promise<null> {
    // si llega data.gradoId, tiene que ser un numero, tiene que ser valido entre los grados
    if (data.gradoId !== undefined && data.gradoId !== null && typeof data.gradoId !== 'number') {
      throw new ExceptionBadFormatField('Le Grado debe ser un número')
    }
    if (data.gradoId !== undefined && data.gradoId !== null && ((await this.gradoRepository.findById(data.gradoId)) == null)) {
      throw new ExceptionBadFormatField('El Grado no es válido')
    }
    if (data.ramaId !== undefined && data.ramaId !== null && typeof data.ramaId !== 'number') {
      throw new ExceptionBadFormatField('La Rama debe ser un número')
    }
    if (data.ramaId !== undefined && data.ramaId !== null && ((await this.ramaRepository.findById(data.ramaId)) == null)) {
      throw new ExceptionBadFormatField('La Rama no es válida')
    }
    return null
  }

  async findByIdCurriculum (id: number): Promise<Curriculum | null> {
    const curriculum = await this.userRepository.findByIdCurriculum(id)
    if (curriculum == null) {
      return null
    }
    return curriculum
  }

  async updateCurriculum (id: number, data: any): Promise<Curriculum | null> {
    const curriculum = await this.userRepository.updateCurriculum(id, data)
    if (curriculum == null) {
      return null
    }
    if (curriculum == null) {
      return null
    }
    return curriculum
  }
}
