import winston from 'winston'
import { formatStringOrUndefined } from '@utils/formating'

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
  const fecha = new Date();
  const opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric' as 'numeric',
    month: '2-digit' as '2-digit',
    day: '2-digit' as '2-digit',
    hour: '2-digit' as '2-digit',
    minute: '2-digit' as '2-digit',
    second: '2-digit' as '2-digit',
    hour12: false,
  };
  const date = fecha.toLocaleString('es-ES', opciones);

  console.log(`[${date}] [${level.toUpperCase()}] ${message}`)
}
