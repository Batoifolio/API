// models/user.model.ts
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { UserInterface } from '../interfaces/user.interface'

const prisma = new PrismaClient()

export const Estado = z.enum(['conectado', 'desconectado'])

export class User implements UserInterface {
  id: number
  nombre: string
  apellidos: string
  username: string
  email: string
  password: string
  pueblo: string
  gradoId: number | null
  ramaId: number | null
  estado: string
  fotoPerfil?: string | null
  descripcion?: string | null
  telefono?: string | null
  ultimaConexion: Date
  rolId?: number | null
  empresaId?: number | null
  buscaEmpresa: boolean
  visibilidad: boolean
  creadoEn: Date
  borrado: boolean

  static schema = z.object({
    id: z.number().int(),
    nombre: z.string(),
    apellidos: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    pueblo: z.string(),
    gradoId: z.number().int(),
    ramaId: z.number().int(),
    estado: Estado.default('conectado'),
    fotoPerfil: z.string().url().nullable().optional(),
    descripcion: z.string().nullable().optional(),
    telefono: z.string().nullable().optional(),
    ultimaConexion: z.coerce.date(),
    rolId: z.number().int().nullable().optional(),
    empresaId: z.number().int().nullable().optional(),
    buscaEmpresa: z.boolean(),
    visibilidad: z.boolean(),
    creadoEn: z.coerce.date(),
    borrado: z.boolean()
  })

  constructor (
    id: number,
    nombre: string,
    apellidos: string,
    username: string,
    email: string,
    password: string,
    pueblo: string,
    gradoId: number | null,
    ramaId: number | null,
    estado: string,
    fotoPerfil: string | null | undefined,
    descripcion: string | null | undefined,
    telefono: string | null | undefined,
    ultimaConexion: Date,
    rolId: number | null | undefined,
    empresaId: number | null | undefined,
    buscaEmpresa: boolean,
    visibilidad: boolean,
    creadoEn: Date,
    borrado: boolean
  ) {
    this.id = id
    this.nombre = nombre
    this.apellidos = apellidos
    this.username = username
    this.email = email
    this.password = password
    this.pueblo = pueblo
    this.gradoId = gradoId
    this.ramaId = ramaId
    this.estado = estado
    this.fotoPerfil = fotoPerfil
    this.descripcion = descripcion
    this.telefono = telefono
    this.ultimaConexion = ultimaConexion
    this.rolId = rolId
    this.empresaId = empresaId
    this.buscaEmpresa = buscaEmpresa
    this.visibilidad = visibilidad
    this.creadoEn = creadoEn
    this.borrado = borrado
  }

  public static async count (): Promise<number> {
    return await prisma.user.count({ where: { borrado: false } })
  }

  public static async findAll (): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return users.map(user => User.mapToModel(user))
  }

  public static async findById (id: number): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { id, borrado: false }
    })
    return (user != null) ? User.mapToModel(user) : null
  }

  public static async create (data: Omit<z.infer<typeof User.schema>, 'id' | 'creadoEn' | 'ultimaConexion'>): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        nombre: data.nombre,
        apellidos: data.apellidos,
        username: data.username,
        email: data.email,
        password: data.password,
        pueblo: data.pueblo,
        estado: data.estado,
        fotoPerfil: data.fotoPerfil,
        descripcion: data.descripcion,
        telefono: data.telefono,
        buscaEmpresa: data.buscaEmpresa,
        visibilidad: data.visibilidad,
        creadoEn: new Date(),
        ultimaConexion: new Date(),
        borrado: data.borrado,
        gradoId: data.gradoId ?? null,
        ramaId: data.ramaId ?? null,
        rolId: data.rolId ?? undefined,
        empresaId: data.empresaId ?? undefined
      }
    })
    return User.mapToModel(newUser)
  }

  public static async update (id: number, data: Partial<Omit<z.infer<typeof User.schema>, 'id'>>): Promise<User | null> {
    const user = await prisma.user.update({
      where: { id },
      data
    })
    return user !== null && user !== undefined ? User.mapToModel(user) : null
  }

  public static async delete (id: number): Promise<User | null> {
    const user = await prisma.user.update({
      where: { id },
      data: { borrado: true }
    })
    return User.mapToModel(user)
  }

  public static async findAllPaginate (page: number, take: number): Promise<User[]> {
    const skip = (page - 1) * take
    const users = await prisma.user.findMany({
      skip,
      take,
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return users.map(user => User.mapToModel(user))
  }

  public static mapToModel (data: any): User {
    const parsed = User.schema.parse(data)
    return new User(
      parsed.id,
      parsed.nombre,
      parsed.apellidos,
      parsed.username,
      parsed.email,
      parsed.password,
      parsed.pueblo,
      parsed.gradoId,
      parsed.ramaId,
      parsed.estado,
      parsed.fotoPerfil,
      parsed.descripcion,
      parsed.telefono,
      parsed.ultimaConexion,
      parsed.rolId,
      parsed.empresaId,
      parsed.buscaEmpresa,
      parsed.visibilidad,
      parsed.creadoEn,
      parsed.borrado
    )
  }
}
