import { createBaseRouter } from '@src/types/baseRouter'
import { RamasController } from '../controllers/ramas.controller'

const ramasRouter = createBaseRouter()
const ramaController = new RamasController()

ramasRouter.get('/', false, ramaController.getAllRamas.bind(ramaController))
// ramasRouter.get('/:id', true, ramaController.getRamaById.bind(ramaController))

export default {
  path: '/ramas',
  router: ramasRouter.router
}
