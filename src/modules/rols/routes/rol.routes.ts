// routes/rol.routes.ts
import { createBaseRouter } from '@src/types/baseRouter'
import { RolController } from '../controllers/rol.controller'

const rolRouter = createBaseRouter()
const rolController = new RolController()

rolRouter.get('/', true, rolController.findAll.bind(rolController))
rolRouter.get('/:id', true, rolController.findById.bind(rolController))
rolRouter.post('/', true, rolController.create.bind(rolController))
rolRouter.put('/:id', true, rolController.update.bind(rolController))
rolRouter.delete('/:id', true, rolController.delete.bind(rolController))

export default {
  path: '/rols',
  router: rolRouter.router
}
