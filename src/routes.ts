import express, { Router } from 'express'
import { baseModuleRouter } from '@src/types/baseModuleRouter'
import { authMiddleware } from '@modules/auth/middlewares/auth.middleware'

// Importar más rutas de módulos aquí
import UsersRouter from '@modules/users/routes/users.routes'
import RamasRouter from '@modules/ramas/routes/ramas.routes'

// Funcion para indexar las rutas de los módulos de foma centralizada
const modules: baseModuleRouter[] = [UsersRouter, RamasRouter]

// Ruta test
const router = Router()
router.get('/', (req, res) => {
  res.send('Hello World')
  req.app.locals.log('info', 'Hello World')
})

export const mountRoutes = (app: express.Application): void => {
  for (const mod of modules) {
    const middleware = mod.authorized ? [authMiddleware] : []
    app.use(`/api${mod.path}`, ...middleware, mod.router)
  }

  // Montar la ruta de prueba
  app.use('/', router)
}
