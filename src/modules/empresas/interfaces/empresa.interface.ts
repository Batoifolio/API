export interface EmpresaInterface {
  id: number
  nombre: string
  cif: string
  direccion: string
  sector: string
  telefono: string
  email: string
  creadoEn: Date
  borrado?: boolean
  User?: {
    id: number
    nombre: string
    apellidos: string
    username: string
    email: string
    pueblo: string | null
    telefono?: string | null
    fotoPerfil?: string | null
    descripcion?: string | null
  }
}
