import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'
import routes from './routes' // Importar el archivo de rutas
import { globals } from './config/globals'

const app: Application = express()

// Variables globales para la app
app.locals = globals

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

// Usar las rutas centralizadas
app.use(routes)

export default app
