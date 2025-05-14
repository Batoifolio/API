// controllers/ramas.controller.ts
import { Request, Response } from 'express'
import { RamasService } from '../services/ramas.service'
import { Controller } from '@src/types/baseController'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'

export class RamasController extends Controller {
  private readonly ramasService = new RamasService()

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryPaginate = this.getQueryPaginate(req)
      const { data, pagination } = await this.ramasService.findAll(queryPaginate)

      this.successResponse(req, res, data, 'Ramas obtenidas correctamente', 200, pagination)
    } catch (error) {
      this.errorResponse(res, error, 'Error al obtener ramas')
    }
  }

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const rama = await this.ramasService.findById(id)

      if (rama != null) {
        this.successResponse(req, res, rama, 'Rama obtenida correctamente', 200)
      } else {
        this.errorResponse(res, null, 'Rama no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(res, error, 'Error al obtener la rama')
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre } = req.body

      if (nombre != null) {
        const rama = await this.ramasService.create(nombre)
        this.successResponse(req, res, rama, 'Rama creada correctamente', 201)
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(res, error, 'Error al crear la rama')
      }
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const { nombre } = req.body

      if (nombre != null) {
        const rama = await this.ramasService.update(id, nombre)

        if (rama != null) {
          this.successResponse(req, res, rama, 'Rama actualizada correctamente', 200)
        } else {
          this.errorResponse(res, null, 'Rama no encontrada', 404)
        }
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(res, error, 'Error al actualizar la rama')
      }
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const rama = await this.ramasService.delete(id)

      if (rama != null) {
        this.successResponse(req, res, rama, 'Rama eliminada correctamente', 200)
      } else {
        this.errorResponse(res, null, 'Rama no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(res, 'Error al eliminar la rama')
    }
  }
}
