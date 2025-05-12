import { PrismaClient } from '@prisma/client'
import { Repository } from '@src/types/baseRepository'
import { Familia } from '../models/familia.model'

const prisma = new PrismaClient()

export class PrismaUserRepository extends Repository {
  async findAll (): Promise<Familia[]> {
    const familias = await prisma.familia.findMany({ where: { borrado: false } })
    return familias.map(this.mapToDomain)
  }

  async findById (id: number): Promise<Familia | null> {
    const familia = await prisma.familia.findUnique({ where: { id } })
    return (familia != null) ? this.mapToDomain(familia) : null
  }

  // async create(data: Partial<User>): Promise<User> {
  //   const created = await prisma.user.create({ data: data as any })
  //   return this.mapToDomain(created)
  // }

  // async update(id: number, data: Partial<User>): Promise<User> {
  //   const updated = await prisma.user.update({ where: { id }, data })
  //   return this.mapToDomain(updated)
  // }

  // async delete(id: number): Promise<void> {
  //   await prisma.user.update({
  //     where: { id },
  //     data: { borrado: true }
  //   })
  // }

  private mapToDomain (data: any): Familia {
    return new Familia(
      data.id,
      data.nombre,
      data.borrado
    )
  }
}
