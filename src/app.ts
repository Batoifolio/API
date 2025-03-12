import express from 'express'
import client from './db/client'

const app = express()
app.use(express.json())

const PORT = process.env.PORT ?? 3000

app.get('/', (_req, res) => {
  res.send('Hello World')
})

app.get('/data', async (_req, res) => {
  try {
    const result = await client.query('SELECT * FROM usuario;')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los datos' })
  } finally {
    // Asegúrate de cerrar la conexión después de la consulta
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
