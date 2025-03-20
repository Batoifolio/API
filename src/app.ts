import express, { Application } from 'express'
import requestLogger from './middlewares/requestLogger'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import routes from './routes'
import { globals } from './config/globals'

const app: Application = express()

// Variables globales para la app
app.locals = globals

// Middlewares
app.use(requestLogger)
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

// Usar las rutas centralizadas
app.use(routes)

export default app
