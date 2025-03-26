// import { Controller } from '@src/types'
import { Controller } from '@src/types/baseController'
// import { UsersService } from '../services/users.service'

export class UsersController extends Controller {
  // private readonly UsersService = new UsersService()

  public getAllUsers (_req: any, res: any): void {
    try {
      const user = { id: 1, name: 'John Doe' } // Simulación de datos
      this.successResponse(res, user, 'Users encontrado')
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
