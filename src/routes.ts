import { Router } from 'express'
// import userRoutes from './modules/users/routes/user.routes';
// Importar más rutas de módulos aquí

const router = Router()

// Ruta test
router.get('/', (_req, res) => {
  res.send('Hello World')
})

router.get('/data', async (req, res) => {
  const data = await req.app.locals.db.query('SELECT * FROM usuario')
  res.send(data)
})

// Registrar rutas de módulos
//* Rutas para api

// router.use('/api/users', userRoutes);

export default router
