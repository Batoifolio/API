// services/empresa.service.ts
import { PaginationResult, QueryPaginate } from '@src/types'
import { ExceptionBadFormatField } from '@src/types/baseExceptionBadFormatField'
import { EmpresaRepository } from '../repositories/empresa.repository'
import { EmpresaInterface } from '../interfaces/empresa.interface'

export class EmpresaService {
  private readonly empresaRepository = new EmpresaRepository()

  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<EmpresaInterface>> {
    return await this.empresaRepository.findAll(queryPaginate)
  }

  async findById (id: number): Promise<EmpresaInterface | null> {
    return await this.empresaRepository.findById(id)
  }

  async create (data: Partial<EmpresaInterface>): Promise<EmpresaInterface> {
    if ((await this.empresaRepository.emailUnique(data.email as string)) != null) {
      throw new ExceptionBadFormatField('Email ya existe')
    }
    if ((await this.empresaRepository.cifUnique(data.cif as string)) != null) {
      throw new ExceptionBadFormatField('CIF ya existe')
    }

    return await this.empresaRepository.create(data)
  }

  async update (id: number, data: Partial<EmpresaInterface>): Promise<EmpresaInterface | null> {
    return await this.empresaRepository.update(id, data)
  }

  async delete (id: number): Promise<EmpresaInterface | null> {
    return await this.empresaRepository.delete(id)
  }
}
