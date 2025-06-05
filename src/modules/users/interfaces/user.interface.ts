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
  gradoId: number | null
  ramaId: number | null
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
  grado?: GradoInterface | null
  rama?: RamaInterface | null

  // Métodos adicionales
  verifyPassword: (password: string) => Promise<boolean>
}
