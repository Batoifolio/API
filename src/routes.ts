import { Router } from 'express'
// Importar más rutas de módulos aquí
import usuarioRouter from '@modules/usuario/routes/usuario.routes'

const router = Router()

// Ruta test
router.get('/', (req, res) => {
  res.send('Hello World')
  req.app.locals.log('info', 'Hello World')
})

router.get('/data', async (req, res) => {
  const data = await req.app.locals.db.query('SELECT * FROM usuario')
  res.send(data)
})

// Registrar rutas de módulos
//* Rutas para api
router.use('/api/users', usuarioRouter)

export default router
