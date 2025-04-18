import { Request, Response } from 'express'
import { Exception } from '@src/types/baseException'
import { Controller } from '@src/types/baseController'

import { AuthService } from '../services/auth.service'

export class AuthController extends Controller {
  private readonly authService = new AuthService()

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body
      if (name === undefined) {
        throw new Exception('falta nombre', 401)
      }
      if (email === undefined) {
        throw new Exception('falta email', 401)
      }
      if (password === undefined) {
        throw new Exception('falta contraseña', 401)
      }

      const user = await this.authService.register(name, email, password)
      this.successResponse(req, res, user, 'Usuario registrado Correctamente', 200)
    } catch (error) {
      this.errorResponse(res, error)
    }
  }
}
