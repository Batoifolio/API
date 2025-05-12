import { PrismaClient } from '@prisma/client'
import { IUserRepository } from '../interfaces/user.repository'
import { User } from '../models/user.model'

const prisma = new PrismaClient()

export class PrismaUserRepository implements IUserRepository {
  async findAll (): Promise<User[]> {
    const users = await prisma.user.findMany({ where: { borrado: false } })
    return users.map(this.mapToDomain)
  }

  async findById (id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    return (user != null) ? this.mapToDomain(user) : null
  }

  async create (data: Partial<User>): Promise<User> {
    const created = await prisma.user.create({ data: data as any })
    return this.mapToDomain(created)
  }

  async update (id: number, data: Partial<User>): Promise<User> {
    const updated = await prisma.user.update({ where: { id }, data })
    return this.mapToDomain(updated)
  }

  async delete (id: number): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { borrado: true }
    })
  }

  private mapToDomain (data: any): User {
    return new User(
      data.id,
      data.nombre,
      data.apellidos,
      data.username,
      data.email,
      data.pueblo,
      data.gradoId,
      data.familiaId,
      data.estado,
      data.creadoEn,
      data.ultimaConexion,
      data.buscaEmpresa,
      data.visibilidad,
      data.borrado,
      data.fotoPerfil,
      data.descripcion,
      data.telefono,
      data.rolId,
      data.empresaId
    )
  }
}
