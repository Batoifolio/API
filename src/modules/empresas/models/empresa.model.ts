// models/empresa.model.ts
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { EmpresaInterface } from '../interfaces/empresa.interface'

const prisma = new PrismaClient()

export class Empresa implements EmpresaInterface {
  id: number
  // TODO campos de Empresa
  borrado: boolean

  static schema = z.object({
    id: z.number().int(),
    // TODO campos de Empresa
    borrado: z.boolean().optional().default(false)
  })

  constructor (
    id: number,
    // TODO campos de Empresa
    borrado: boolean = false
  ) {
    this.id = id
    // TODO campos de Empresa
    this.borrado = borrado
  }

  public static async count (): Promise<number> {
    return await prisma.empresa.count({ where: { borrado: false } })
  }

  public static async findAll (): Promise<Empresa[]> {
    const empresas = await prisma.empresa.findMany({
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return empresas.map(empresa => Empresa.mapToModel(empresa))
  }

  public static async findById (id: number): Promise<Empresa | null> {
    const empresa = await prisma.empresa.findFirst({
      where: { id, borrado: false }
    })
    return (empresa != null) ? Empresa.mapToModel(empresa) : null
  }

  public static async create (data: Omit<z.infer<typeof Empresa.schema>, 'id' >): Promise<Empresa> {
    const newEmpresa = await prisma.empresa.create({
      data: {
        // TODO campos de Empresa
      }
    })
    return Empresa.mapToModel(newEmpresa)
  }

  public static async update (id: number, data: Partial<Omit<z.infer<typeof Empresa.schema>, 'id'>>): Promise<Empresa | null> {
    const empresa = await prisma.empresa.update({
      where: { id },
      data: {
        ...data
      }

    })
    return empresa !== null && empresa !== undefined ? Empresa.mapToModel(empresa) : null
  }

  public static async delete (id: number): Promise<Empresa | null> {
    const empresa = await prisma.empresa.update({
      where: { id },
      data: { borrado: true }
    })
    return Empresa.mapToModel(empresa)
  }

  public static async findAllPaginate (page: number, take: number): Promise<Empresa[]> {
    const skip = (page - 1) * take
    const empresas = await prisma.empresa.findMany({
      skip,
      take,
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return empresas.map(empresa => Empresa.mapToModel(empresa))
  }

  public static mapToModel (data: any): Empresa {
    const parsed = Empresa.schema.parse(data)
    return new Empresa(
      parsed.id,
      // TODO campos de Empresa
      parsed.borrado
    )
  }
}
