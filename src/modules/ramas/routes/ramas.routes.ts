import { createBaseRouter } from '@src/types/baseRouter'
import { RamasController } from '../controllers/ramas.controller'

const ramasRouter = createBaseRouter()
const ramaController = new RamasController()

ramasRouter.get('/', false, ramaController.getAllRamas.bind(ramaController))
ramasRouter.get('/:id', false, ramaController.getRamaById.bind(ramaController))
ramasRouter.post('/', false, ramaController.createRama.bind(ramaController))
ramasRouter.put('/:id', false, ramaController.updateRama.bind(ramaController))
ramasRouter.delete('/:id', false, ramaController.deleteRama.bind(ramaController))

export default {
  path: '/ramas',
  router: ramasRouter.router
}
