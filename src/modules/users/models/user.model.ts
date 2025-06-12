// models/user.model.ts
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { UserInterface, Curriculum } from '../interfaces/user.interface'
// import { generarPDF } from '../utils/crearPDF'
import { GradoInterface } from '@modules/grados/interfaces/grado.interface'
import { RamaInterface } from '@modules/ramas/interfaces/rama.interface'

const prisma = new PrismaClient()

export const Estado = z.enum(['conectado', 'desconectado'])

export class User implements UserInterface {
  id: number
  nombre: string
  apellidos: string
  username: string
  email: string
  password: string
  pueblo?: string | null
  estado: string
  fotoPerfil?: string | null
  descripcion?: string | null
  telefono?: string | null
  ultimaConexion: Date
  rolId?: number | null
  empresaId?: number | null
  buscaEmpresa: boolean
  visibilidad: boolean
  gradoId: number | null | undefined
  ramaId: number | null | undefined
  grado?: GradoInterface | null | undefined
  rama?: RamaInterface | null | undefined
  creadoEn: Date
  borrado: boolean

  static schema = z.object({
    id: z.number().int(),
    nombre: z.string(),
    apellidos: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    pueblo: z.string().nullable().optional(),
    gradoId: z.number().int().nullable().optional().default(null),
    ramaId: z.number().int().nullable().optional().default(null),
    estado: Estado.default('conectado'),
    fotoPerfil: z.string().nullable().optional(),
    descripcion: z.string().nullable().optional(),
    telefono: z.string().nullable().optional(),
    ultimaConexion: z.coerce.date(),
    rolId: z.number().int().nullable().optional(),
    empresaId: z.number().int().nullable().optional(),
    buscaEmpresa: z.boolean().optional().default(true),
    visibilidad: z.boolean().default(true),
    creadoEn: z.coerce.date().default(() => new Date()),
    borrado: z.boolean().optional().default(false)
  })

  constructor (
    id: number,
    nombre: string,
    apellidos: string,
    username: string,
    email: string,
    password: string,
    pueblo: string | null,
    gradoId: number | null | undefined,
    ramaId: number | null | undefined,
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
    grado?: { id: number, nombre: string } | undefined,
    rama?: { id: number, nombre: string } | undefined,
    borrado: boolean = false
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
    this.fotoPerfil = fotoPerfil ?? `https://ui-avatars.com/api/?uppercase=false&name=${this.nombre}+${this.apellidos}`
    this.descripcion = descripcion
    this.telefono = telefono
    this.ultimaConexion = ultimaConexion
    this.rolId = rolId
    this.empresaId = empresaId
    this.buscaEmpresa = buscaEmpresa
    this.visibilidad = visibilidad
    this.creadoEn = creadoEn
    this.grado = grado // Inicializar grado como undefined
    this.rama = rama // Inicializar rama como undefined
    this.borrado = borrado
  }

  public static async count (): Promise<number> {
    return await prisma.user.count({ where: { borrado: false } })
  }

  public static async findAll (): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { borrado: false },
      orderBy: { id: 'asc' },
      include: {
        Grado: {
          select: { id: true, nombre: true }
        },
        Rama: {
          select: { id: true, nombre: true }
        }
      }
    })
    return users.map(user => User.mapToModel(user))
  }

  // public static async findById (id: number): Promise<User | null> {
  //   const user = await prisma.user.findFirst({
  //     where: { id, borrado: false },
  //     include: { Grado: true }
  //   })
  //   return (user != null) ? User.mapToModel(user) : null
  // }
  public static async findById (id: number): Promise<User | null> {
    const data = await prisma.user.findFirst({
      where: { id, borrado: false },
      include: {
        Grado: {
          select: { id: true, nombre: true }
        },
        Rama: {
          select: { id: true, nombre: true }
        }
      }
    })

    if (data == null) return null

    const user = User.mapToModel(data)
    return user
  }

  public static async findByEmail (email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email, borrado: false },
      include: {
        Grado: {
          select: { id: true, nombre: true }
        },
        Rama: {
          select: { id: true, nombre: true }
        }
      }
    })
    return (user != null) ? User.mapToModel(user) : null
  }

  public static async emailUnique (email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email },
      include: {
        Grado: {
          select: { id: true, nombre: true }
        },
        Rama: {
          select: { id: true, nombre: true }
        }
      }
    })
    return (user != null) ? User.mapToModel(user) : null
  }

  public static async findByUsername (username: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { username, borrado: false },
      include: {
        Grado: {
          select: { id: true, nombre: true }
        },
        Rama: {
          select: { id: true, nombre: true }
        }
      }
    })
    return (user != null) ? User.mapToModel(user) : null
  }

  public static async usernameUnique (username: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { username, borrado: false },
      include: {
        Grado: {
          select: { id: true, nombre: true }
        },
        Rama: {
          select: { id: true, nombre: true }
        }
      }
    })
    return (user != null) ? User.mapToModel(user) : null
  }

  public static async hashPassword (plainPassword: string): Promise<string> {
    const saltRounds = 10
    return await Promise.resolve(await bcrypt.hash(plainPassword, saltRounds))
  }

  public async verifyPassword (plainPassword: string): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/return-await
      return await bcrypt.compare(plainPassword, this.password)
    } catch (err) {
      console.error('Error al comparar contraseñas:', err)
      return false
    }
  }

  public static async create (data: Omit<z.infer<typeof User.schema>, 'id' | 'creadoEn' | 'ultimaConexion'>): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        nombre: data.nombre,
        apellidos: data.apellidos,
        username: data.username,
        email: data.email,
        password: await this.hashPassword(data.password),
        estado: data.estado,
        fotoPerfil: data.fotoPerfil,
        descripcion: data.descripcion,
        telefono: data.telefono,
        buscaEmpresa: data.buscaEmpresa,
        visibilidad: data.visibilidad,
        creadoEn: new Date(),
        ultimaConexion: new Date(),
        borrado: data.borrado,
        pueblo: data.pueblo ?? '',
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
      data: {
        nombre: data.nombre,
        apellidos: data.apellidos,
        username: data.username,
        email: data.email,
        // password: await this.hashPassword(data.password),
        estado: data.estado,
        fotoPerfil: data.fotoPerfil,
        descripcion: data.descripcion,
        telefono: data.telefono,
        buscaEmpresa: data.buscaEmpresa,
        visibilidad: data.visibilidad,
        creadoEn: new Date(),
        ultimaConexion: new Date(),
        borrado: data.borrado,
        pueblo: (data.pueblo !== null && data.pueblo !== undefined && data.pueblo !== '') ? data.pueblo : undefined,
        gradoId: (data.gradoId !== null && data.gradoId !== undefined && data.gradoId !== 0) ? data.gradoId : undefined,
        ramaId: (data.ramaId !== null && data.ramaId !== undefined && data.ramaId !== 0) ? data.ramaId : undefined,
        rolId: data.rolId ?? undefined,
        empresaId: data.empresaId ?? undefined,
        password: data.password !== undefined && data.password !== null ? await this.hashPassword(data.password) : undefined
      },
      include: {
        Grado: {
          select: { id: true, nombre: true }
        },
        Rama: {
          select: { id: true, nombre: true }
        }
      }

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
      orderBy: { id: 'asc' },
      include: {
        Grado: {
          select: { id: true, nombre: true }
        },
        Rama: {
          select: { id: true, nombre: true }
        }
      }
    })
    return users.map(user => User.mapToModel(user))
  }

  public static async filterAllPaginate (
    page: number,
    take: number,
    where: any
  ): Promise<User[]> {
    const skip = (page - 1) * take

    const users = await prisma.user.findMany({
      skip,
      take,
      where,
      orderBy: { id: 'asc' },
      include: {
        Grado: {
          select: { id: true, nombre: true }
        },
        Rama: {
          select: { id: true, nombre: true }
        }
      }
    })

    return users.map(user => User.mapToModel(user))
  }

  public static async findByIdCurriculum (id: number): Promise<Curriculum | null> {
    const user = await prisma.user.findFirst({
      where: { id, borrado: false },
      select: {
        curriculum: true
      }
    })
    if (user === null || user.curriculum === undefined) {
      return null
    }
    return User.mapToCorriculum(user.curriculum)
  }

  public static async updateCurriculum (id: number, data: Curriculum): Promise<Curriculum | null> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        curriculum: {
          titulo: data.titulo,
          resumen: data.resumen,
          experiencia: data.experiencia.map(exp => ({
            id: exp.id,
            empresa: exp.empresa,
            cargo: exp.cargo,
            descripcion: exp.descripcion,
            fechaInicio: new Date(exp.fechaInicio).toISOString(),
            fechaFin: new Date(exp.fechaFin).toISOString()
          })),
          educacion: data.educacion.map(edu => ({
            id: edu.id,
            institucion: edu.institucion,
            titulo: edu.titulo,
            descripcion: edu.descripcion,
            fechaInicio: new Date(edu.fechaInicio).toISOString(),
            fechaFin: new Date(edu.fechaFin).toISOString()
          })),
          habilidades: data.habilidades,
          idiomas: data.idiomas?.map(idioma => ({
            id: idioma.id,
            nivel: idioma.nivel,
            idioma: idioma.idioma
          })) ?? []
        }
      }
    })

    return User.mapToCorriculum(user.curriculum) ?? null
  }

  private static mapToCorriculum (data: any): Curriculum {
    return {
      titulo: data.titulo,
      resumen: data.resumen,
      experiencia: data.experiencia.map((exp: any) => ({
        id: exp.id,
        empresa: exp.empresa,
        cargo: exp.cargo,
        descripcion: exp.descripcion,
        fechaInicio: typeof exp.fechaInicio === 'string' ? new Date(exp.fechaInicio).toISOString().split('T')[0] : '',
        fechaFin: typeof exp.fechaFin === 'string' ? new Date(exp.fechaFin).toISOString().split('T')[0] : ''
      })),
      educacion: data.educacion.map((edu: any) => ({
        id: edu.id,
        institucion: edu.institucion,
        titulo: edu.titulo,
        descripcion: edu.descripcion,
        fechaInicio: typeof edu.fechaInicio === 'string' ? new Date(edu.fechaInicio).toISOString().split('T')[0] : '',
        fechaFin: typeof edu.fechaFin === 'string' ? new Date(edu.fechaFin).toISOString().split('T')[0] : ''
      })),
      habilidades: data.habilidades,
      idiomas: Array.isArray(data.idiomas) ? data.idiomas.map((idioma: any) => ({
        id: idioma.id,
        nivel: idioma.nivel,
        idioma: idioma.idioma
      })) : undefined
    }
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
      parsed.pueblo ?? null,
      parsed.gradoId ?? null,
      parsed.ramaId ?? null,
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
      (data.Grado != null) ? data.Grado : undefined,
      (data.Rama != null) ? data.Rama : undefined,
      parsed.borrado
    )
  }
}
