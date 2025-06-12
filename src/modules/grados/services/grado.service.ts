// services/grado.service.ts
import { PaginationResult, QueryPaginate } from '@src/types'
// import { ExceptionBadFormatField } from '@src/types/baseExceptionBadFormatField'
import { GradoRepository } from '../repositories/grado.repository'
import { GradoInterface } from '../interfaces/grado.interface'

export class GradoService {
  private readonly gradoRepository = new GradoRepository()

  async getAllIds (): Promise<number[]> {
    return await this.gradoRepository.getAllIds()
  }

  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<GradoInterface>> {
    return await this.gradoRepository.findAll(queryPaginate)
  }

  async findById (id: number): Promise<GradoInterface | null> {
    return await this.gradoRepository.findById(id)
  }

  async create (data: Partial<GradoInterface>): Promise<GradoInterface> {
    // TODO logic de validacion
    // if ((await this.gradoRepository.findByEmail(data.email as string)) != null) {
    //   throw new ExceptionBadFormatField('Email ya existe')
    // }
    return await this.gradoRepository.create(data)
  }

  async update (id: number, data: Partial<GradoInterface>): Promise<GradoInterface | null> {
    return await this.gradoRepository.update(id, data)
  }

  async delete (id: number): Promise<GradoInterface | null> {
    return await this.gradoRepository.delete(id)
  }
}
