import { Pagination, QueryPaginate } from '@src/types'
import { Exception } from '@src/types/baseException'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: '/.env.local' })
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

export abstract class Controller {
  /**
     * Envía una respuesta de éxito con soporte para paginación.
     * @param req - Objeto de solicitud de Express.
     * @param res - Objeto de respuesta de Express.
     * @param data - Datos a enviar en la respuesta.
     * @param message - Mensaje opcional.
     * @param statusCode - Código de estado HTTP (por defecto 200).
     * @param pagination - Información de paginación (opcional).
     * @param generateToken - Indica si se debe generar un token (por defecto true).
     * @return void
     */
  protected successResponse (
    req: Request,
    res: Response,
    data: any,
    message: string = 'Operación exitosa',
    statusCode: number = 200,
    pagination?: Pagination,
    generateToken: boolean = true
  ): void {
    // Si tiene un token en la req, y generateToken es verdadero, lo generamos
    if (req.user !== undefined && generateToken) {
      const token = this.generateToken(req.user)
      res.setHeader('Authorization', `Bearer ${token}`)
    }
    req.app.locals.log('info', `Respuesta exitosa: ${message}`)

    const response: any = {
      success: true,
      message,
      data
    }

    // Si la información de paginación está presente, incluirla en la respuesta
    if (pagination != null) {
      response.pagination = pagination
    }

    res.status(statusCode).json(response)
  }

  /**
   *
   * @param req - Objeto de solicitud de Express.
   * @param res - Objeto de respuesta de Express.
   * @param data - Datos a enviar en la respuesta.
   * @param message - Mensaje opcional.
   * @param statusCode - Código de estado HTTP (por defecto 200).
   * @param generateToken - Indica si se debe generar un token (por defecto true).
   * @return QueryPaginate
   */
  protected getQueryPaginate (req: any): QueryPaginate {
    if (req.query.page === undefined) {
      req.query.page = '1'
    }

    if (req.query.limit === undefined) {
      req.query.limit = '10'
    }

    const page = (parseInt(req.query.page as string) !== 0) ? parseInt(req.query.page as string) : 1
    const limit = (parseInt(req.query.limit as string) !== 0) ? parseInt(req.query.limit as string) : 10
    return {
      page,
      limit
    }
  }

  /**
   * Envía una respuesta de error.
   * @param res - Objeto de respuesta de Express.
   * @param error - Error o mensaje de error.
   * @param statusCode - Código de estado HTTP (por defecto 500).
   * @return void
   */
  protected errorResponse (req: any, res: any, error: any, messageToApi: string = 'Error en la api', statusCode: number = 500): void {
    const e = error as Error
    req.app.locals.log('error', `Error: ${e.message}`)
    if (error instanceof Exception) {
      res.status(error.statusCode).json({
        success: false,
        message: error instanceof Error ? `Error: ${error.message}` : error
      })
    } else {
      res.status(statusCode).json({
        success: false,
        message: messageToApi
      })
    }
  }

  /**
   * Genera un token JWT para el usuario.
   * @param userId - ID del usuario.
   * @returns Token JWT.
   */
  private generateToken (userId: number): string {
    if (JWT_SECRET === undefined) {
      throw new Error('JWT_SECRET is not defined')
    }
    if (JWT_EXPIRES_IN === undefined) {
      throw new Error('JWT_EXPIRES_IN is not defined')
    }
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: Number(JWT_EXPIRES_IN) })
  }

  protected validateFieldsNotNullOrEmpty (fields: Record<string, any>): void {
    for (const [key, value] of Object.entries(fields)) {
      if (value === undefined || value === null || value === '') {
        throw new ExceptionMissField(key)
      }
    }
  }

  protected validateTelefono (telefono: string): boolean {
    const telefonoRegex = /^\d{9}$/ // Formato español: 9 dígitos
    return telefonoRegex.test(telefono)
  }

  protected validateEmail (email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Formato de email básico
    return emailRegex.test(email)
  }

  protected validateCif (cif: string): boolean {
    const cifRegex = /^[A-Z]{1}[0-9]{7}[0-9A-J]$/ // Formato de CIF español
    return cifRegex.test(cif)
  }
}
