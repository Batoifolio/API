import express, { Application } from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import requestLogger from '@middlewares/requestLogger'
import { globals } from '@config/globals'
import { mountRoutes } from '@src/routes' // Asegúrate de importar la función correctamente

const app: Application = express()

// Variables globales para la app
app.locals = globals

// Middlewares globales
app.use(requestLogger)
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

// Usar las rutas centralizadas, las cuales incluyen el middleware de autenticación
mountRoutes(app)

export default app
