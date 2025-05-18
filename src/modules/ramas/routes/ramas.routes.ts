// routes/ramas.routes.ts
import { createBaseRouter } from '@src/types/baseRouter'
import { RamasController } from '../controllers/ramas.controller'

const ramasRouter = createBaseRouter()
const ramaController = new RamasController()

ramasRouter.get('/', false, ramaController.findAll.bind(ramaController))
ramasRouter.get('/:id', false, ramaController.findById.bind(ramaController))
ramasRouter.post('/', false, ramaController.create.bind(ramaController))
ramasRouter.put('/:id', false, ramaController.update.bind(ramaController))
ramasRouter.delete('/:id', false, ramaController.delete.bind(ramaController))

export default {
  path: '/ramas',
  router: ramasRouter.router
}
