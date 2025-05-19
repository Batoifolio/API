// routes/grado.routes.ts
import { createBaseRouter } from '@src/types/baseRouter'
import { GradoController } from '../controllers/grado.controller'

const gradoRouter = createBaseRouter()
const gradoController = new GradoController()

gradoRouter.get('/', true, gradoController.findAll.bind(gradoController))
gradoRouter.get('/:id', true, gradoController.findById.bind(gradoController))
gradoRouter.post('/', true, gradoController.create.bind(gradoController))
gradoRouter.put('/:id', true, gradoController.update.bind(gradoController))
gradoRouter.delete('/:id', true, gradoController.delete.bind(gradoController))

export default {
  path: '/grados',
  router: gradoRouter.router
}
