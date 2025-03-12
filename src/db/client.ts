import { Client } from 'pg'
import dotenv from 'dotenv'
dotenv.config({ path: '/.env.local' })

const client = new Client({
  host: process.env.DB_HOST, // Cambia esto por la IP del contenedor Docker si es necesario
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
})

// Conectar a la base de datos
client.connect()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error de conexión: ', err))

export default client
