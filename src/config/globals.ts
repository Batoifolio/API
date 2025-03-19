// Variables globales para la app
import DatabaseClient from '../database/client'

const db = new DatabaseClient()
// eslint-disable-next-line @typescript-eslint/no-floating-promises
db.connect()

export const globals = {
  db: db
}
