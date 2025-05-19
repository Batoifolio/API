// models/rol.model.ts
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { RolInterface } from '../interfaces/rol.interface'

const prisma = new PrismaClient()

export class Rol implements RolInterface {
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
    return await prisma.rol.count({ where: { borrado: false } })
  }

  public static async findAll (): Promise<Rol[]> {
    const rols = await prisma.rol.findMany({
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return rols.map(rol => Rol.mapToModel(rol))
  }

  public static async findById (id: number): Promise<Rol | null> {
    const rol = await prisma.rol.findFirst({
      where: { id, borrado: false }
    })
    return (rol != null) ? Rol.mapToModel(rol) : null
  }

  public static async create (data: Omit<z.infer<typeof Rol.schema>, 'id'>): Promise<Rol> {
    const newRol = await prisma.rol.create({
      data: {
        ...data
      }
    })
    return Rol.mapToModel(newRol)
  }

  public static async update (id: number, data: Partial<Omit<z.infer<typeof Rol.schema>, 'id'>>): Promise<Rol | null> {
    const rol = await prisma.rol.update({
      where: { id },
      data: {
        ...data
      }

    })
    return rol !== null && rol !== undefined ? Rol.mapToModel(rol) : null
  }

  public static async delete (id: number): Promise<Rol | null> {
    const rol = await prisma.rol.update({
      where: { id },
      data: { borrado: true }
    })
    return Rol.mapToModel(rol)
  }

  public static async findAllPaginate (page: number, take: number): Promise<Rol[]> {
    const skip = (page - 1) * take
    const rols = await prisma.rol.findMany({
      skip,
      take,
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return rols.map(rol => Rol.mapToModel(rol))
  }

  public static mapToModel (data: any): Rol {
    const parsed = Rol.schema.parse(data)
    return new Rol(
      parsed.id,
      parsed.nombre,
      parsed.borrado
    )
  }
}
