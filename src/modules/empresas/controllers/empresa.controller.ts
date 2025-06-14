import { Request, Response } from 'express'
import { EmpresaService } from '../services/empresa.service'
import { Controller } from '@src/types/baseController'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'

export class EmpresaController extends Controller {
  private readonly empresaService = new EmpresaService()

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryPaginate = this.getQueryPaginate(req)
      const { data, pagination } = await this.empresaService.findAll(queryPaginate)

      this.successResponse(req, res, data, 'Empresas obtenidas correctamente', 200, pagination)
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener empresas')
    }
  }

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const empresa = await this.empresaService.findById(id)

      if (empresa != null) {
        this.successResponse(req, res, empresa, 'Empresa obtenida correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Empresa no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener la empresa')
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, cif, direccion, sector, telefono, email } = req.body

      this.validateFieldsNotNullOrEmpty({ nombre, cif, direccion, sector, telefono, email })

      this.validateEmail(email)

      this.validateCif(cif)

      this.validateTelefono(telefono)

      const empresa = await this.empresaService.create({ nombre, cif, direccion, sector, telefono, email })
      this.successResponse(req, res, empresa, 'Empresa creada correctamente', 201)
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(req, res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(req, res, error, 'Error al crear la empresa')
      }
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const { nombre } = req.body

      if (nombre != null) {
        const empresa = await this.empresaService.update(id, { nombre: nombre })

        if (empresa != null) {
          this.successResponse(req, res, empresa, 'Empresa actualizada correctamente', 200)
        } else {
          this.errorResponse(req, res, null, 'Empresa no encontrada', 404)
        }
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(req, res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(req, res, error, 'Error al actualizar la empresa')
      }
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const empresa = await this.empresaService.delete(id)

      if (empresa != null) {
        this.successResponse(req, res, empresa, 'Empresa eliminada correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Empresa no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, 'Error al eliminar la empresa')
    }
  }
}
