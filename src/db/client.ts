import { Client } from 'pg'

const client = new Client({
  host: 'postgres', // Cambia esto por la IP del contenedor Docker si es necesario
  port: 5432,
  user: 'backend',
  password: 'pr0y3ct_ñ',
  database: 'proyecto_db'
})

// Conectar a la base de datos
client.connect()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error de conexión: ', err))

export default client
