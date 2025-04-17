import express, { Router } from 'express'
import { baseModuleRouter } from '@src/types/baseModuleRouter'

// Importar rutas de los módulos
import UsersRouter from '@modules/users/routes/users.routes'
import RamasRouter from '@modules/ramas/routes/ramas.routes'

// Lista centralizada de módulos
const modules: baseModuleRouter[] = [UsersRouter, RamasRouter]

// Ruta test
const router = Router()
router.get('/', (req, res) => {
  res.send('Hello World')
  req.app.locals.log('info', 'Hello World')
})

export const mountRoutes = (app: express.Application): void => {
  for (const mod of modules) {
    app.use(`/api${mod.path}`, mod.router)
  }

  app.use('/', router)
}
