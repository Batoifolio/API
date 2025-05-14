import { Request, Response } from 'express'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'
import { Controller } from '@src/types/baseController'

import { AuthService } from '../services/auth.service'

export class AuthController extends Controller {
  private readonly authService = new AuthService()

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body
      if (name === undefined) {
        throw new ExceptionMissField('name')
      }
      if (email === undefined) {
        throw new ExceptionMissField('email')
      }
      if (password === undefined) {
        throw new ExceptionMissField('password')
      }

      const user = await this.authService.register(name, email, password)
      this.successResponse(req, res, user, 'Usuario registrado Correctamente', 200)
    } catch (error) {
      this.errorResponse(res, error, 'Error al registrar el usuario')
    }
  }
}
