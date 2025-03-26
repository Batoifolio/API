import express, { Application } from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import requestLogger from '@middlewares/requestLogger'
import { globals } from '@config/globals'
import routes from '@src/routes'

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
