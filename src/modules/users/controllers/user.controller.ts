// controllers/users.controller.ts
import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { Controller } from '@src/types/baseController'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'
import { User } from '../models/user.model'

export class UsersController extends Controller {
  private readonly userService = new UserService()

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryPaginate = this.getQueryPaginate(req)
      const { data, pagination } = await this.userService.findAll(queryPaginate)

      this.successResponse(req, res, data, 'Usuarios obtenidos correctamente', 200, pagination)
    } catch (error) {
      this.errorResponse(res, 'Error al obtener los usuarios', 500)
    }
  }

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const user = await this.userService.findById(id)

      if (user != null) {
        this.successResponse(req, res, user, 'Usuario obtenido correctamente', 200)
      } else {
        this.errorResponse(res, 'Usuario no encontrado', 404)
      }
    } catch (error) {
      this.errorResponse(res, 'Error al obtener el usuario', 500)
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = User.schema.omit({ id: true, creadoEn: true, ultimaConexion: true }).safeParse(req.body)

      if (!parsed.success) {
        const missingFields = parsed.error.errors.map(err => err.path.join('.')).join(', ')
        throw new ExceptionMissField(missingFields)
      }

      const newUser = await this.userService.create(parsed.data)
      this.successResponse(req, res, newUser, 'Usuario creado correctamente', 201)
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(res, `Campos faltantes o inválidos: ${error.message}`, error.statusCode)
      } else {
        this.errorResponse(res, 'Error al crear el usuario', 500)
      }
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const data = req.body

      const user = await this.userService.update(id, data)

      if (user != null) {
        this.successResponse(req, res, user, 'Usuario actualizado correctamente', 200)
      } else {
        this.errorResponse(res, 'Usuario no encontrado', 404)
      }
    } catch (error) {
      this.errorResponse(res, 'Error al actualizar el usuario', 500)
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const user = await this.userService.delete(id)

      if (user != null) {
        this.successResponse(req, res, user, 'Usuario eliminado correctamente', 200)
      } else {
        this.errorResponse(res, 'Usuario no encontrado', 404)
      }
    } catch (error) {
      this.errorResponse(res, 'Error al eliminar el usuario', 500)
    }
  }
}
