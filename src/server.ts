import 'module-alias/register'
import dotenv from 'dotenv'
import app from '@src/app'

// Cargar variables de entorno
dotenv.config()

const PORT = process.env.PORT != null ? parseInt(process.env.PORT) : 3000

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
