export abstract class Controller {
  /**
       * Envía una respuesta de éxito.
       * @param res - Objeto de respuesta de Express.
       * @param data - Datos a enviar en la respuesta.
       * @param message - Mensaje opcional.
       * @param statusCode - Código de estado HTTP (por defecto 200).
       */
  protected successResponse (res: any, data: any, message: string = 'Operación exitosa', statusCode: number = 200): void {
    res.status(statusCode).json({
      success: true,
      message,
      data
    })
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
