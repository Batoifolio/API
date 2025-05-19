// services/preferencia.service.ts
import { PaginationResult, QueryPaginate } from '@src/types'
// import { ExceptionBadFormatField } from '@src/types/baseExceptionBadFormatField'
import { PreferenciaRepository } from '../repositories/preferencia.repository'
import { PreferenciaInterface } from '../interfaces/preferencia.interface'

export class PreferenciaService {
  private readonly preferenciaRepository = new PreferenciaRepository()

  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<PreferenciaInterface>> {
    return await this.preferenciaRepository.findAll(queryPaginate)
  }

  async findById (id: number): Promise<PreferenciaInterface | null> {
    return await this.preferenciaRepository.findById(id)
  }

  async create (data: Partial<PreferenciaInterface>): Promise<PreferenciaInterface> {
    // TODO logic de validacion
    // if ((await this.preferenciaRepository.findByEmail(data.email as string)) != null) {
    //   throw new ExceptionBadFormatField('Email ya existe')
    // }

    return await this.preferenciaRepository.create(data)
  }

  async update (id: number, data: Partial<PreferenciaInterface>): Promise<PreferenciaInterface | null> {
    return await this.preferenciaRepository.update(id, data)
  }

  async delete (id: number): Promise<PreferenciaInterface | null> {
    return await this.preferenciaRepository.delete(id)
  }
}
