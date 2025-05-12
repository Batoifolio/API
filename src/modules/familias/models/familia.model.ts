import { z } from 'zod'

export const FamiliaSchema = z.object({
  id: z.number().int(),
  nombre: z.string(),
  borrado: z.boolean().default(false)
})

export class Familia {
  id: number
  nombre: string
  borrado: boolean

  constructor (id: number, nombre: string, borrado = false) {
    this.id = id
    this.nombre = nombre
    this.borrado = borrado
  }
}
