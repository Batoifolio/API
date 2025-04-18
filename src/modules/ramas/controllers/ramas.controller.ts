// controllers/ramas.controller.ts
import { Request, Response } from 'express'
import { RamasService } from '../services/ramas.service'
import { Controller } from '@src/types/baseController'

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

  // Métodos para crear, actualizar, eliminar ramas
}
