import { Exception } from './baseException'

export class ExceptionNotPermission extends Exception {
  constructor () {
    const statusCode = 403
    const message = 'No tienes permiso para hacer la acción.'
    super(message, statusCode)
    this.name = 'ExceptionNotPermission'
    Object.setPrototypeOf(this, ExceptionNotPermission.prototype)
  }
}
