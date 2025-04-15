import { Controller } from '@src/types/baseController'
import { Rama } from '@src/types'
import { PrismaClient } from '@prisma/client'

// import { UsersService } from '../services/users.service'

export class UsersController extends Controller {
  // private readonly UsersService = new UsersService()

  public async getAllUsers (_req: any, res: any): Promise<void> {
    try {
      const prisma = new PrismaClient()

      await Promise.all([
        prisma.rama.upsert({
          where: { id: 1 },
          update: {},
          create: { id: 1, nombre: 'Informática', borrado: false }
        }),
        prisma.rama.upsert({
          where: { id: 2 },
          update: {},
          create: { id: 2, nombre: 'Telecomunicaciones', borrado: false }
        }),
        prisma.rama.upsert({
          where: { id: 3 },
          update: {},
          create: { id: 3, nombre: 'Industrial', borrado: false }
        }),
        prisma.rama.upsert({
          where: { id: 4 },
          update: {},
          create: { id: 4, nombre: 'Mecánica', borrado: false }
        })
      ])

      let users: Rama[] = []
      try {
        console.log('Fetching users from Rama...')
        users = await prisma.rama.findMany()
        console.log('Users fetched successfully:', users)
      } catch (error) {
        console.error('Error fetching users:', error)
        throw error
      }

      // const users = { id: 1, name: 'John Doe' } // Simulación de datos

      this.successResponse(res, users, 'Users encontrado')
    } catch (error) {
      this.errorResponse(res, 'Error al obtener el Users')
    }
  }

  public getUserById (_req: any, res: any): void {
    try {
      const user = { id: 1, name: 'John Doe' } // Simulación de datos
      this.successResponse(res, user, 'Users encontrado')
    } catch (error) {
      this.errorResponse(res, 'Error al obtener el Users')
    }
  }

  // public async createUser (req: any, res: any): Promise<void> {
  //   try {
  //     const newUser = await this.UsersService.createUser(req.body)
  //     this.successResponse(res, newUser, 'Users encontrado', 201)
  //   } catch (error) {
  //     this.errorResponse(res, 'Error al crear el Users')
  //   }
  // }

  // public async updateUser (req: any, res: any): Promise<void> {
  //   try {
  //     const updatedUser = await this.UsersService.updateUser(Number(req.params.id), req.body)
  //     this.successResponse(res, updatedUser, 'Users actualizado')
  //   } catch (error) {
  //     this.errorResponse(res, 'Error al actualizar el Users')
  //   }
  // }

  // public async deleteUser (req: any, res: any): Promise<void> {
  //   try {
  //     await this.UsersService.deleteUser(Number(req.params.id))
  //     this.successResponse(res, null, 'Users actualizado')
  //   } catch (error) {
  //     this.errorResponse(res, 'Error al eliminar el Users')
  //   }
  // }
}
