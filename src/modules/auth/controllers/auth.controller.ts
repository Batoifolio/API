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
      req.user = user.id
      this.successResponse(req, res, user, 'Usuario registrado Correctamente', 200)
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al registrar el usuario')
    }
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, username, password } = req.body

      if (typeof password !== 'string') {
        throw new ExceptionMissField('password')
      }

      if (typeof email !== 'string' && typeof username !== 'string') {
        throw new ExceptionMissField('email o username')
      }

      const user = await this.authService.login({ email, username, password })
      req.user = user.id
      this.successResponse(req, res, user, 'Usuario logueado correctamente', 200)
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al iniciar sesión')
    }
  }

  public logout = async (req: Request, res: Response): Promise<void> => {
    try {
      req.user = undefined
      res.setHeader('Authorization', '')

      this.successResponse(req, res, null, 'Usuario deslogueado correctamente', 200)
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al cerrar sesión')
    }
  }
}
