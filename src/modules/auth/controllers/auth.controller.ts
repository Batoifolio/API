import { Request, Response } from 'express'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'
import { Controller } from '@src/types/baseController'

import { AuthService } from '../services/auth.service'
import { User } from '@modules/users/models/user.model'

export class AuthController extends Controller {
  private readonly authService = new AuthService()

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = User.schema.omit({ id: true, creadoEn: true, ultimaConexion: true }).safeParse(req.body)

      if (!parsed.success) {
        const missingFields = parsed.error.errors.map(err => err.path.join('.')).join(', ')
        throw new ExceptionMissField(missingFields)
      }

      const user = await this.authService.register(parsed.data)
      this.successResponse(req, res, user, 'Usuario registrado Correctamente', 200)
    } catch (error) {
      this.errorResponse(res, error, 'Error al registrar el usuario')
    }
  }
}
