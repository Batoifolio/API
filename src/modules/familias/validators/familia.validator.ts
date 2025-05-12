import { z } from 'zod'

export const UserCreateSchema = z.object({
  nombre: z.string().min(1),
  apellidos: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  pueblo: z.string(),
  gradoId: z.number(),
  familiaId: z.number()
})
