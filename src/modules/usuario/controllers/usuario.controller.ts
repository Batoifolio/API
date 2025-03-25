import { Controller } from '../../controller'

export class UserController extends Controller {
  public getUser (_req: any, res: any): void {
    try {
      const user = { id: 1, name: 'John Doe' } // Simulación de datos
      this.successResponse(res, user, 'Usuario encontrado')
    } catch (error) {
      this.errorResponse(res, 'Error al obtener el usuario')
    }
  }
}
