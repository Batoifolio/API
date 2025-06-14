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

export class ExceptionBadFormatTelefono extends ExceptionBadFormatField {
  constructor () {
    const message = 'Formato del campo: Telefono: debe tener 9 dígitos'
    super(message)
    Object.setPrototypeOf(this, ExceptionBadFormatTelefono.prototype)
  }
}

export class ExceptionBadFormatEmail extends ExceptionBadFormatField {
  constructor () {
    const message = 'Formato del campo: Email: debe ser una dirección de correo electrónico válida'
    super(message)
    Object.setPrototypeOf(this, ExceptionBadFormatEmail.prototype)
  }
}

export class ExceptionBadFormatCif extends ExceptionBadFormatField {
  constructor () {
    const message = 'Formato del campo: CIF: debe ser un CIF válido. Debe seguir el formato: un numero de 8 dígitos seguido de una letra'
    super(message)
    Object.setPrototypeOf(this, ExceptionBadFormatCif.prototype)
  }
}
