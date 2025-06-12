// models/ramas.model.ts
import { PrismaClient } from '@prisma/client'
import { RamaInterface } from '../interfaces/rama.interface'
import { z } from 'zod'

const prisma = new PrismaClient()

export class Rama implements RamaInterface {
  id: number
  nombre: string
  borrado: boolean

  static schema = z.object({
    id: z.number().int(),
    nombre: z.string(),
    borrado: z.boolean()
  })

  constructor (id: number, nombre: string, borrado = false) {
    this.id = id
    this.nombre = nombre
    this.borrado = borrado
  }

  public static async count (): Promise<number> {
    return await prisma.rama.count()
  }

  public static async findAll (): Promise<Rama[]> {
    const ramas = await prisma.rama.findMany({
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return ramas.map((rama) => Rama.mapToModel(rama))
  }

  public static async getAllIds (): Promise<number[]> {
    const ramas = await prisma.rama.findMany({
      where: { borrado: false },
      select: { id: true }
    })
    return ramas.map((rama) => rama.id)
  }

  public static async findById (id: number): Promise<Rama | null> {
    const rama = await prisma.rama.findFirst({
      where: { id, borrado: false }
    })
    return (rama != null) ? Rama.mapToModel(rama) : null
  }

  public static async create (nombre: string): Promise<Rama> {
    const rama = await prisma.rama.create({
      data: { nombre: nombre }
    })
    return Rama.mapToModel(rama)
  }

  public static async update (id: number, nombre: string): Promise<Rama | null> {
    const rama = await prisma.rama.update({
      where: { id },
      data: { nombre }
    })
    return (rama != null) ? Rama.mapToModel(rama) : null
  }

  public static async delete (id: number): Promise<Rama | null> {
    const rama = await prisma.rama.update({
      where: { id },
      data: { borrado: true }
    })
    return (rama != null) ? Rama.mapToModel(rama) : null
  }

  public static async findByNombre (nombre: string): Promise<Rama | null> {
    const rama = await prisma.rama.findFirst({
      where: { nombre, borrado: false }
    })
    return (rama != null) ? Rama.mapToModel(rama) : null
  }

  public static async findAllPaginate (page: number, take: number): Promise<any> {
    const skip = (page - 1) * take
    return await prisma.rama.findMany({
      skip,
      take,
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
  }

  public static mapToModel (data: any): Rama {
    const { id, nombre, borrado } = Rama.schema.parse(data)
    return new Rama(id, nombre, borrado)
  }
}
