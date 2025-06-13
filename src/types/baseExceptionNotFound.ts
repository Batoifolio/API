import { Exception } from './baseException'

export class ExceptionNotFound extends Exception {
  constructor (registro: string) {
    const statusCode = 404
    const message = `No se ha encontrado el registro ${registro}.`
    super(message, statusCode)
    this.name = 'ExceptionNotFound'
    Object.setPrototypeOf(this, ExceptionNotFound.prototype)
  }
}
