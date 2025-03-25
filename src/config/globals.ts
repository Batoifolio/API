// Variables globales para la app
import DatabaseClient from '../database/client'
import { log } from '../utils/fileLogger'

const db = new DatabaseClient()
// eslint-disable-next-line @typescript-eslint/no-floating-promises
db.connect()

export const globals = {
  db: db,
  log: log
}
