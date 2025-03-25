import winston from 'winston'
import { formatStringOrUndefined } from './formating'

const fileToLog = '../logs/logs.log'

const logger = winston.createLogger({
  level: 'info', // Nivel mínimo de logs (info, warn, error, etc.)
  format: winston.format.combine(
    winston.format.printf(({ level, message }) => {
      const m = formatStringOrUndefined(message)
      return `[${'asd'}] ${level.toUpperCase()}: ${m}`
    })
  ),
  transports: [
    new winston.transports.File({ filename: fileToLog }), // Guarda logs en un archivo
    new winston.transports.Console() // Muestra los logs en la consola
  ]
})

/**
 * Función de log reutilizable
 */
export const log = (level: 'info' | 'warn' | 'error', message: string): void => {
  logger.log({ level, message })
  const date = new Date().toISOString()
  console.log(`[${date}] [${level.toUpperCase()}] ${message}`)
}
