import { Pagination } from '@src/types'

export abstract class Controller {
  /**
     * Envía una respuesta de éxito con soporte para paginación.
     * @param res - Objeto de respuesta de Express.
     * @param data - Datos a enviar en la respuesta.
     * @param message - Mensaje opcional.
     * @param statusCode - Código de estado HTTP (por defecto 200).
     * @param token - Token opcional que se enviará en el header Authorization.
     * @param pagination - Información de paginación (opcional).
     */
  protected successResponse (
    res: any,
    data: any,
    message: string = 'Operación exitosa',
    statusCode: number = 200,
    token?: string,
    pagination?: Pagination
  ): void {
    if (token !== undefined) {
      res.setHeader('Authorization', `Bearer ${token}`)
    }

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
   * Envía una respuesta de error.
   * @param res - Objeto de respuesta de Express.
   * @param error - Error o mensaje de error.
   * @param statusCode - Código de estado HTTP (por defecto 500).
   */
  protected errorResponse (res: any, error: any, statusCode: number = 500): void {
    res.status(statusCode).json({
      success: false,
      message: error instanceof Error ? error.message : error
    })
  }
}
