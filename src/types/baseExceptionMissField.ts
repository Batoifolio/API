import { Exception } from './baseException'

export class BaseExceptionMissField extends Exception {
  constructor (field: string) {
    const statusCode = 400
    const message = `Valor Faltante: ${field}`
    super(message, statusCode)
    this.name = 'ExceptionMissField'
    Object.setPrototypeOf(this, BaseExceptionMissField.prototype)
  }
}
