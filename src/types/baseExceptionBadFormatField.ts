import { Exception } from './baseException'

export class ExceptionBadFormatField extends Exception {
  constructor (field: string) {
    const statusCode = 400
    const message = `Formato del campo: ${field}`
    super(message, statusCode)
    this.name = 'ExceptionBadFormatField'
    Object.setPrototypeOf(this, ExceptionBadFormatField.prototype)
  }
}
