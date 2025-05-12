// controllers/ramas.controller.ts
import { Request, Response } from 'express'
import { RamasService } from '../services/ramas.service'
import { Controller } from '@src/types/baseController'
import { BaseExceptionMissField } from '@src/types/baseExceptionMissField'

export class RamasController extends Controller {
  private readonly ramasService = new RamasService()

  // Endpoint para obtener las ramas paginadas
  public getAllRamas = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryPaginate = this.getQueryPaginate(req)
      const { data, pagination } = await this.ramasService.getRamas(queryPaginate)

      // Enviar la respuesta con paginación
      this.successResponse(req, res, data, 'Ramas obtenidas correctamente', 200, pagination)
    } catch (error) {
      this.errorResponse(res, 'Error al obtener ramas', 500)
    }
  }

  public getRamaById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const rama = await this.ramasService.getRamaById(id)

      if (rama != null) {
        this.successResponse(req, res, rama, 'Rama obtenida correctamente', 200)
      } else {
        this.errorResponse(res, 'Rama no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(res, 'Error al obtener la rama', 500)
    }
  }

  public createRama = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre } = req.body

      if (nombre != null) {
        const rama = await this.ramasService.createRama(nombre)
        this.successResponse(req, res, rama, 'Rama creada correctamente', 201)
      } else {
        throw new BaseExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof BaseExceptionMissField) {
        this.errorResponse(res, error.message, error.statusCode)
      } else {
        this.errorResponse(res, 'Error al crear la rama', 500)
      }
    }
  }

  public updateRama = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const { nombre } = req.body

      if (nombre != null) {
        const rama = await this.ramasService.updateRama(id, nombre)

        if (rama != null) {
          this.successResponse(req, res, rama, 'Rama actualizada correctamente', 200)
        } else {
          this.errorResponse(res, 'Rama no encontrada', 404)
        }
      } else {
        throw new BaseExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof BaseExceptionMissField) {
        this.errorResponse(res, error.message, error.statusCode)
      } else {
        this.errorResponse(res, 'Error al actualizar la rama', 500)
      }
    }
  }

  public deleteRama = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const rama = await this.ramasService.deleteRama(id)

      if (rama != null) {
        this.successResponse(req, res, rama, 'Rama eliminada correctamente', 200)
      } else {
        this.errorResponse(res, 'Rama no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(res, 'Error al eliminar la rama', 500)
    }
  }
}
