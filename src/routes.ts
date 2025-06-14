import express, { Router } from 'express'
import { baseRouterModule } from '@src/types/baseRouter'

// Importar rutas de los módulos
import RamasRouter from '@modules/ramas/routes/ramas.routes'
import UsersRouter from '@modules/users/routes/user.routes'
import AuthRouter from '@modules/auth/routes/auth.routes'
import GradoRouter from '@modules/grados/routes/grado.routes'
import PreferenciaRouter from '@modules/preferencias/routes/preferencia.routes'
import RolRouter from '@modules/rols/routes/rol.routes'
import EmpresaRoutes from '@modules/empresas/routes/empresa.routes'

// Lista centralizada de módulos
const modules: baseRouterModule[] = [AuthRouter, RamasRouter, UsersRouter, GradoRouter, PreferenciaRouter, RolRouter, EmpresaRoutes]

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
