// services/rol.service.ts
import { PaginationResult, QueryPaginate } from '@src/types'
// import { ExceptionBadFormatField } from '@src/types/baseExceptionBadFormatField'
import { RolRepository } from '../repositories/rol.repository'
import { RolInterface } from '../interfaces/rol.interface'

export class RolService {
  private readonly rolRepository = new RolRepository()

  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<RolInterface>> {
    return await this.rolRepository.findAll(queryPaginate)
  }

  async findById (id: number): Promise<RolInterface | null> {
    return await this.rolRepository.findById(id)
  }

  async create (data: Partial<RolInterface>): Promise<RolInterface> {
    // TODO logic de validacion
    // if ((await this.rolRepository.findByEmail(data.email as string)) != null) {
    //   throw new ExceptionBadFormatField('Email ya existe')
    // }

    return await this.rolRepository.create(data)
  }

  async update (id: number, data: Partial<RolInterface>): Promise<RolInterface | null> {
    return await this.rolRepository.update(id, data)
  }

  async delete (id: number): Promise<RolInterface | null> {
    return await this.rolRepository.delete(id)
  }
}
