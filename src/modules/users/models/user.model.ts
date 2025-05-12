import { z } from 'zod'

// Estado
export enum Estado {
  conectado = 'conectado',
  desconectado = 'desconectado',
}

export const userModel = z.object({
  id: z.number().int(),
  nombre: z.string(),
  apellidos: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  pueblo: z.string(),
  gradoId: z.number().int(),
  familiaId: z.number().int(),
  // estado: z.enum(Object.values(Estado)).default(Estado.conectado),
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

// estado              Estado                @default (conectado)
// fotoPerfil          String ?
//   descripcion         String ?
//     telefono            String ?
//       ultimaConexion      DateTime              @default (now())
// rolId               Int ?
//   empresaId           Int ?
//     buscaEmpresa        Boolean               @default (false)
// visibilidad         Boolean               @default (true)
// creadoEn            DateTime              @default (now())
// borrado             Boolean               @default (false)
