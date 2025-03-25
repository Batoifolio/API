import express, { Application } from 'express'
import requestLogger from './middlewares/requestLogger'
import { globals } from './config/globals'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import routes from './routes'

const app: Application = express()

// Variables globales para la app
app.locals = globals

// Middlewares

// Middleware para manejar errores
app.use(requestLogger)
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

// Usar las rutas centralizadas
app.use(routes)

export default app
