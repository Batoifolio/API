// controllers/ramas.controller.ts
import { Request, Response } from 'express'
import { RamasService } from '../services/ramas.service'
import { Controller } from '@src/types/baseController'

export class RamasController extends Controller {
  private readonly ramasService = new RamasService()

  // Endpoint para obtener las ramas paginadas
  public getAllRamas = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.query.page === undefined) {
        req.query.page = '1'
      }

      if (req.query.limit === undefined) {
        req.query.limit = '10'
      }

      const page = (parseInt(req.query.page as string) !== 0) ? parseInt(req.query.page as string) : 1
      const limit = (parseInt(req.query.limit as string) !== 0) ? parseInt(req.query.limit as string) : 10

      const { data, pagination } = await this.ramasService.getRamas(page, limit)

      // Enviar la respuesta con paginación
      this.successResponse(res, data, 'Ramas obtenidas correctamente', 200, undefined, pagination)
    } catch (error) {
      this.errorResponse(res, 'Error al obtener ramas', 500)
    }
  }

  // Métodos para crear, actualizar, eliminar ramas
}
