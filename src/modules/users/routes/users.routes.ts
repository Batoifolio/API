import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'

const UsersRouter = Router()
const userController = new UsersController()

UsersRouter.get('/', userController.getAllUsers.bind(userController))
UsersRouter.get('/:id', userController.getUserById.bind(userController))
// UsersRouter.post('/', userController.getUser.bind(userController))
// UsersRouter.put('/:id', userController.getUser.bind(userController))
// UsersRouter.delete('/:id', userController.getUser.bind(userController))

export default UsersRouter
