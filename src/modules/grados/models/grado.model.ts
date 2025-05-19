// models/grado.model.ts
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { GradoInterface } from '../interfaces/grado.interface'

const prisma = new PrismaClient()

export class Grado implements GradoInterface {
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
    return await prisma.grado.count({ where: { borrado: false } })
  }

  public static async findAll (): Promise<Grado[]> {
    const grados = await prisma.grado.findMany({
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return grados.map(grado => Grado.mapToModel(grado))
  }

  public static async findById (id: number): Promise<Grado | null> {
    const grado = await prisma.grado.findFirst({
      where: { id, borrado: false }
    })
    return (grado != null) ? Grado.mapToModel(grado) : null
  }

  public static async create (data: Omit<z.infer<typeof Grado.schema>, 'id'>): Promise<Grado> {
    const newGrado = await prisma.grado.create({
      data: {
        nombre: data.nombre
      }
    })
    return Grado.mapToModel(newGrado)
  }

  public static async update (id: number, data: Partial<Omit<z.infer<typeof Grado.schema>, 'id'>>): Promise<Grado | null> {
    const grado = await prisma.grado.update({
      where: { id },
      data: {
        ...data
      }

    })
    return grado !== null && grado !== undefined ? Grado.mapToModel(grado) : null
  }

  public static async delete (id: number): Promise<Grado | null> {
    const grado = await prisma.grado.update({
      where: { id },
      data: { borrado: true }
    })
    return Grado.mapToModel(grado)
  }

  public static async findAllPaginate (page: number, take: number): Promise<Grado[]> {
    const skip = (page - 1) * take
    const grados = await prisma.grado.findMany({
      skip,
      take,
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return grados.map(grado => Grado.mapToModel(grado))
  }

  public static mapToModel (data: any): Grado {
    const parsed = Grado.schema.parse(data)
    return new Grado(
      parsed.id,
      parsed.nombre,
      parsed.borrado
    )
  }
}
