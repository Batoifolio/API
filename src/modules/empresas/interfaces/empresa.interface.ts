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
}
