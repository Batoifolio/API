// models/preferencia.model.ts
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { PreferenciaInterface } from '../interfaces/preferencia.interface'

const prisma = new PrismaClient()

export class Preferencia implements PreferenciaInterface {
  id: number
  nombre: string
  borrado: boolean

  static schema = z.object({
    id: z.number().int(),
    nombre: z.string(),
    borrado: z.boolean().optional().default(false)
  })

  constructor (
    id: number,
    nombre: string,
    borrado: boolean = false
  ) {
    this.id = id
    this.nombre = nombre
    this.borrado = borrado
  }

  public static async count (): Promise<number> {
    return await prisma.preferencia.count({ where: { borrado: false } })
  }

  public static async findAll (): Promise<Preferencia[]> {
    const preferencias = await prisma.preferencia.findMany({
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return preferencias.map(preferencia => Preferencia.mapToModel(preferencia))
  }

  public static async findById (id: number): Promise<Preferencia | null> {
    const preferencia = await prisma.preferencia.findFirst({
      where: { id, borrado: false }
    })
    return (preferencia != null) ? Preferencia.mapToModel(preferencia) : null
  }

  public static async create (data: Omit<z.infer<typeof Preferencia.schema>, 'id'>): Promise<Preferencia> {
    const newPreferencia = await prisma.preferencia.create({
      data: {
        ...data
      }
    })
    return Preferencia.mapToModel(newPreferencia)
  }

  public static async update (id: number, data: Partial<Omit<z.infer<typeof Preferencia.schema>, 'id'>>): Promise<Preferencia | null> {
    const preferencia = await prisma.preferencia.update({
      where: { id },
      data: {
        ...data
      }

    })
    return preferencia !== null && preferencia !== undefined ? Preferencia.mapToModel(preferencia) : null
  }

  public static async delete (id: number): Promise<Preferencia | null> {
    const preferencia = await prisma.preferencia.update({
      where: { id },
      data: { borrado: true }
    })
    return Preferencia.mapToModel(preferencia)
  }

  public static async findAllPaginate (page: number, take: number): Promise<Preferencia[]> {
    const skip = (page - 1) * take
    const preferencias = await prisma.preferencia.findMany({
      skip,
      take,
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return preferencias.map(preferencia => Preferencia.mapToModel(preferencia))
  }

  public static mapToModel (data: any): Preferencia {
    const parsed = Preferencia.schema.parse(data)
    return new Preferencia(
      parsed.id,
      parsed.nombre,
      parsed.borrado
    )
  }
}
