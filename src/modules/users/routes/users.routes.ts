import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'

const UsersRouter = Router()
const userController = new UsersController()

UsersRouter.get('/', userController.getAllUsers)
UsersRouter.get('/:id', userController.getUserById)
// UsersRouter.post('/', userController.getUser)
// UsersRouter.put('/:id', userController.getUser)
// UsersRouter.delete('/:id', userController.getUser)

export default UsersRouter
