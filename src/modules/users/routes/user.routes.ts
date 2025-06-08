// import { Router } from 'express'
import { createBaseRouter } from '@src/types/baseRouter'
import { UsersController } from '../controllers/user.controller'

const usersRouter = createBaseRouter()
const userController = new UsersController()

usersRouter.get('/', true, userController.findAll.bind(userController))
usersRouter.get('/:id', true, userController.findById.bind(userController))
usersRouter.post('/', true, userController.create.bind(userController))
usersRouter.put('/:id', true, userController.update.bind(userController))
usersRouter.delete('/:id', true, userController.delete.bind(userController))

usersRouter.get('/:id/curriculum/generate', true, userController.generatePDF.bind(userController))
usersRouter.get('/:id/curriculum', true, userController.findByIdCurriculum.bind(userController))
usersRouter.put('/:id/curriculum', true, userController.curriculum.bind(userController))

export default {
  path: '/users',
  router: usersRouter.router
}
