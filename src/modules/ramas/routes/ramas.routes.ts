// routes/ramas.routes.ts
import { createBaseRouter } from '@src/types/baseRouter'
import { RamasController } from '../controllers/ramas.controller'

const ramasRouter = createBaseRouter()
const ramaController = new RamasController()

ramasRouter.get('/', true, ramaController.findAll.bind(ramaController))
ramasRouter.get('/:id', true, ramaController.findById.bind(ramaController))
ramasRouter.post('/', true, ramaController.create.bind(ramaController))
ramasRouter.put('/:id', true, ramaController.update.bind(ramaController))
ramasRouter.delete('/:id', true, ramaController.delete.bind(ramaController))

export default {
  path: '/ramas',
  router: ramasRouter.router
}
