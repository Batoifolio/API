import { Router } from 'express'
import { UserController } from '../controllers/usuario.controller'

const usuarioRouter = Router()
const userController = new UserController()

usuarioRouter.get('/', (req, res) => userController.getUser(req, res))

export default usuarioRouter
