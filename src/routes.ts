import { Router } from 'express'
// Importar más rutas de módulos aquí
import UsersRouter from '@modules/users/routes/users.routes'
// import { main } from '@utils/seed'

const router = Router()

// Ruta test
router.get('/', (req, res) => {
  res.send('Hello World')
  req.app.locals.log('info', 'Hello World')
})

router.get('/data', async (req, res) => {
  const data = await req.app.locals.db.query('SELECT * FROM Users')
  res.send(data)
})

router.get('/seed', async (_req, _res) => {
  // await main()
})

// Registrar rutas de módulos
//* Rutas para api
router.use('/api/users', UsersRouter)

export default router
