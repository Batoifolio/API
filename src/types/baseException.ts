export class Exception extends Error {
  name: string
  statusCode: number

  constructor (message: string, statusCode: number) {
    super(message)
    this.name = 'Exception'
    Object.setPrototypeOf(this, Exception.prototype)
    this.statusCode = statusCode
  }
}
