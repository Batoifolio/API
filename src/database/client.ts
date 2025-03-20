import { Client } from 'pg'
import { IDatabaseClient } from './client.interface'
import dotenv from 'dotenv'
dotenv.config({ path: '/.env.local' })

const client = new Client({
  host: process.env.DB_HOST, // Cambia esto por la IP del contenedor Docker si es necesario
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
})

class DatabaseClient implements IDatabaseClient {
  public async query (query: string): Promise<any> {
    return await client
      .query(query)
      .then(res => res.rows)
      .catch(err => console.error('Error en la consulta: ', err))
  }

  public async end (): Promise<void> {
    return await client.end()
      .then(() => console.log('Conexión cerrada'))
      .catch(err => console.error('Error al cerrar la conexión: ', err))
  }

  public async connect (): Promise<void> {
    return await client.connect()
      .then(() => console.log('Conexión exitosa'))
      .catch(err => console.error('Error de conexión: ', err))
  }
}

export default DatabaseClient
