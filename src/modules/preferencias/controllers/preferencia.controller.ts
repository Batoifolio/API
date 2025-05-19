import { Request, Response } from 'express'
import { PreferenciaService } from '../services/preferencia.service'
import { Controller } from '@src/types/baseController'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'

export class PreferenciaController extends Controller {
  private readonly preferenciaService = new PreferenciaService()

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryPaginate = this.getQueryPaginate(req)
      const { data, pagination } = await this.preferenciaService.findAll(queryPaginate)

      this.successResponse(req, res, data, 'Preferencias obtenidas correctamente', 200, pagination)
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener preferencias')
    }
  }

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const preferencia = await this.preferenciaService.findById(id)

      if (preferencia != null) {
        this.successResponse(req, res, preferencia, 'Preferencia obtenida correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Preferencia no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener la preferencia')
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre } = req.body

      if (nombre != null) {
        const preferencia = await this.preferenciaService.create({ nombre: nombre })
        this.successResponse(req, res, preferencia, 'Preferencia creada correctamente', 201)
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(req, res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(req, res, error, 'Error al crear la preferencia')
      }
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const { nombre } = req.body

      if (nombre != null) {
        const preferencia = await this.preferenciaService.update(id, { nombre: nombre })

        if (preferencia != null) {
          this.successResponse(req, res, preferencia, 'Preferencia actualizada correctamente', 200)
        } else {
          this.errorResponse(req, res, null, 'Preferencia no encontrada', 404)
        }
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(req, res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(req, res, error, 'Error al actualizar la preferencia')
      }
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const preferencia = await this.preferenciaService.delete(id)

      if (preferencia != null) {
        this.successResponse(req, res, preferencia, 'Preferencia eliminada correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Preferencia no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, 'Error al eliminar la preferencia')
    }
  }
}
