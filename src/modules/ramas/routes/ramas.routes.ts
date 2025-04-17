import { Router } from 'express'
import { RamasController } from '../controllers/ramas.controller'

const RamasRouter = Router()
const ramaController = new RamasController()

RamasRouter.get('/', ramaController.getAllRamas.bind(ramaController))
// RamasRouter.get('/:id', ramaController.getRamaById.bind(ramaController))
// RamasRouter.post('/', ramaController.getRama.bind(ramaController))
// RamasRouter.put('/:id', ramaController.getRama.bind(ramaController))
// RamasRouter.delete('/:id', ramaController.getRama.bind(ramaController))

export default {
  path: '/ramas',
  router: RamasRouter,
  authorized: false
}
