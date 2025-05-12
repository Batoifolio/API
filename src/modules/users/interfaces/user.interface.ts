export enum Estado {
  conectado = 'conectado',
  desconectado = 'desconectado',
}

export interface IUser {
  id: number
  nombre: string
  apellidos: string
  username: string
  email: string
  password: string
  pueblo: string
  gradoId: number
  familiaId: number
  estado: Estado
  fotoPerfil?: string
  descripcion?: string
  telefono?: string
  ultimaConexion: Date
  rolId?: number
  empresaId?: number
  buscaEmpresa: boolean
  visibilidad: boolean
  creadoEn: Date
  borrado: boolean
}
