import morgan, { TokenIndexer } from 'morgan'
import { Request, Response } from 'express'
import { formatStringOrUndefined } from '../utils/functions'
import { log } from '../utils/fileLogger'

import fs from 'fs'
const fileToLog = '../logs/logs.log'

// Formato personalizado para los logs
const formatLogger = (tokens: TokenIndexer<Request, Response>, req: Request, res: Response): string => {
  const date = new Date().toISOString() // Fecha y hora en formato ISO
  const method = formatStringOrUndefined(tokens.method(req, res)) // Método HTTP
  const path = formatStringOrUndefined(tokens.url(req, res)) // Ruta solicitada
  const status = formatStringOrUndefined(tokens.status(req, res)) // Código de estado HTTP
  const responseTime = formatStringOrUndefined(tokens['response-time'](req, res)) // Tiempo de respuesta
  log('info', 'message')
  fs.appendFileSync(fileToLog, `[${date}] [${method}] path: "${path}" code: "${status}" time: "${responseTime}ms"}\n`)
  return `[${date}] [${method}] path: "${path}" code: "${status}" time: "${responseTime}ms"}`
}

// Middleware de Morgan con el formato personalizado
const requestLogger = morgan(formatLogger, {
  stream: {
    write: (message: string) => console.log(message.trim())
  }
})

export default requestLogger
