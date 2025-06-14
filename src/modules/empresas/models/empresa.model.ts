// models/empresa.model.ts
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { EmpresaInterface } from '../interfaces/empresa.interface'

const prisma = new PrismaClient()

export class Empresa implements EmpresaInterface {
  id: number
  nombre: string
  cif: string
  direccion: string
  sector: string
  telefono: string
  email: string
  creadoEn: Date
  borrado: boolean

  static schema = z.object({
    id: z.number().int(),
    nombre: z.string(),
    cif: z.string(),
    direccion: z.string(),
    sector: z.string(),
    telefono: z.string(),
    email: z.string(),
    creadoEn: z.date().optional().default(() => new Date()),
    borrado: z.boolean().optional().default(false)
  })

  constructor (
    id: number,
    nombre: string,
    cif: string,
    direccion: string,
    sector: string,
    telefono: string,
    email: string,
    creadoEn: Date,
    borrado: boolean = false
  ) {
    this.id = id
    this.nombre = nombre
    this.cif = cif
    this.direccion = direccion
    this.sector = sector
    this.telefono = telefono
    this.email = email
    this.creadoEn = creadoEn
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

  public static async findByEmail (email: string): Promise<Empresa | null> {
    const empresa = await prisma.empresa.findFirst({
      where: { email, borrado: false }
    })
    return (empresa != null) ? Empresa.mapToModel(empresa) : null
  }

  public static async findByCIF (cif: string): Promise<Empresa | null> {
    const empresa = await prisma.empresa.findFirst({
      where: { cif, borrado: false }
    })
    return (empresa != null) ? Empresa.mapToModel(empresa) : null
  }

  public static async emailUnique (email: string): Promise<Empresa | null> {
    const empresa = await prisma.empresa.findFirst({
      where: { email, borrado: false }
    })
    return (empresa != null) ? Empresa.mapToModel(empresa) : null
  }

  public static async cifUnique (cif: string): Promise<Empresa | null> {
    const empresa = await prisma.empresa.findFirst({
      where: { cif, borrado: false }
    })
    return (empresa != null) ? Empresa.mapToModel(empresa) : null
  }

  public static async create (data: Omit<z.infer<typeof Empresa.schema>, 'id' | 'creadoEn'>): Promise<Empresa> {
    const newEmpresa = await prisma.empresa.create({
      data: {
        ...data,
        creadoEn: new Date() // Set created date to now
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
      parsed.nombre,
      parsed.cif,
      parsed.direccion,
      parsed.sector,
      parsed.telefono,
      parsed.email,
      parsed.creadoEn,
      parsed.borrado
    )
  }
}
