import { Request, Response } from 'express'
import { GradoService } from '../services/grado.service'
import { Controller } from '@src/types/baseController'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'

export class GradoController extends Controller {
  private readonly gradoService = new GradoService()

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryPaginate = this.getQueryPaginate(req)
      const { data, pagination } = await this.gradoService.findAll(queryPaginate)

      this.successResponse(req, res, data, 'Grados obtenidas correctamente', 200, pagination)
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener grados')
    }
  }

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const grado = await this.gradoService.findById(id)

      if (grado != null) {
        this.successResponse(req, res, grado, 'Grado obtenida correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Grado no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener la grado')
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre } = req.body

      if (nombre != null) {
        const grado = await this.gradoService.create({ nombre: nombre })
        this.successResponse(req, res, grado, 'Grado creada correctamente', 201)
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(req, res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(req, res, error, 'Error al crear la grado')
      }
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const { nombre } = req.body

      if (nombre != null) {
        const grado = await this.gradoService.update(id, { nombre: nombre })

        if (grado != null) {
          this.successResponse(req, res, grado, 'Grado actualizada correctamente', 200)
        } else {
          this.errorResponse(req, res, null, 'Grado no encontrada', 404)
        }
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(req, res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(req, res, error, 'Error al actualizar la grado')
      }
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const grado = await this.gradoService.delete(id)

      if (grado != null) {
        this.successResponse(req, res, grado, 'Grado eliminada correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Grado no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, 'Error al eliminar la grado')
    }
  }
}
