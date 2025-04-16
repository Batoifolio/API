import express, { Router } from 'express'
import { baseModuleRouter } from '@src/types/baseModuleRouter'
import { authMiddleware } from '@modules/auth/middlewares/auth.middleware'

// Importar más rutas de módulos aquí
import UsersRouter from '@modules/users/routes/users.routes'

// Funcion para indexar las rutas de los módulos de foma centralizada
const modules: [baseModuleRouter] = [UsersRouter]

const router = Router()

// Ruta test
router.get('/', (req, res) => {
  res.send('Hello World')
  req.app.locals.log('info', 'Hello World')
})

export const mountRoutes = (app: express.Application): void => {
  for (const mod of modules) {
    const middleware = mod.authorized ? [authMiddleware] : []
    app.use(`/api${mod.path}`, ...middleware, mod.router)
  }
}
