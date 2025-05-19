import { Request, Response } from 'express'
import { RolService } from '../services/rol.service'
import { Controller } from '@src/types/baseController'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'

export class RolController extends Controller {
  private readonly rolService = new RolService()

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryPaginate = this.getQueryPaginate(req)
      const { data, pagination } = await this.rolService.findAll(queryPaginate)

      this.successResponse(req, res, data, 'Rols obtenidas correctamente', 200, pagination)
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener rols')
    }
  }

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const rol = await this.rolService.findById(id)

      if (rol != null) {
        this.successResponse(req, res, rol, 'Rol obtenida correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Rol no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener la rol')
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre } = req.body

      if (nombre != null) {
        const rol = await this.rolService.create({ nombre: nombre })
        this.successResponse(req, res, rol, 'Rol creada correctamente', 201)
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(req, res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(req, res, error, 'Error al crear la rol')
      }
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const { nombre } = req.body

      if (nombre != null) {
        const rol = await this.rolService.update(id, { nombre: nombre })

        if (rol != null) {
          this.successResponse(req, res, rol, 'Rol actualizada correctamente', 200)
        } else {
          this.errorResponse(req, res, null, 'Rol no encontrada', 404)
        }
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(req, res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(req, res, error, 'Error al actualizar la rol')
      }
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const rol = await this.rolService.delete(id)

      if (rol != null) {
        this.successResponse(req, res, rol, 'Rol eliminada correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Rol no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, 'Error al eliminar la rol')
    }
  }
}
