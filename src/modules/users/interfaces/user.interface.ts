import { GradoInterface } from '@modules/grados/interfaces/grado.interface'
import { RamaInterface } from '@modules/ramas/interfaces/rama.interface'

export interface UserInterface {
  id: number
  nombre: string
  apellidos: string
  username: string
  email: string
  password: string
  pueblo?: string | null
  gradoId: number | null | undefined
  ramaId: number | null | undefined
  estado?: string
  fotoPerfil?: string | null
  descripcion?: string | null
  telefono?: string | null
  ultimaConexion: Date
  rolId?: number | null
  empresaId?: number | null
  buscaEmpresa: boolean
  visibilidad: boolean
  creadoEn: Date
  borrado?: boolean

  // Relaciones
  grado?: GradoInterface | null | undefined
  rama?: RamaInterface | null | undefined
  // Métodos adicionales
  verifyPassword: (password: string) => Promise<boolean>
}

export interface Curriculum {
  titulo: string
  resumen: string
  experiencia: Experiencia[]
  educacion: Educacion[]
  habilidades: string[]
  idiomas: Idioma[] | undefined
}

export interface Experiencia {
  id: string
  empresa: string
  cargo: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
}
export interface Educacion {
  id: string
  institucion: string
  titulo: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
}

export interface PDFData {
  nombre: string
  apellidos: string
  email: string
  pueblo: string
  descripcion: string
  telefono: string | null
  grado: string | null
  rama: string | null
  curriculum: Curriculum
}

export interface Idioma {
  id: string
  nivel: string
  idioma: string
}

export interface UserFilter {
  nombre?: string
  email?: string
  pueblo?: string
  gradoId?: number
  ramaId?: number
}
