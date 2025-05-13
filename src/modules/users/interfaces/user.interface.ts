export interface UserInterface {
  id: number
  nombre: string
  apellidos: string
  username: string
  email: string
  password: string
  pueblo: string
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
}
