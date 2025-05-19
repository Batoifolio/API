// routes/preferencia.routes.ts
import { createBaseRouter } from '@src/types/baseRouter'
import { PreferenciaController } from '../controllers/preferencia.controller'

const preferenciaRouter = createBaseRouter()
const preferenciaController = new PreferenciaController()

preferenciaRouter.get('/', true, preferenciaController.findAll.bind(preferenciaController))
preferenciaRouter.get('/:id', true, preferenciaController.findById.bind(preferenciaController))
preferenciaRouter.post('/', true, preferenciaController.create.bind(preferenciaController))
preferenciaRouter.put('/:id', true, preferenciaController.update.bind(preferenciaController))
preferenciaRouter.delete('/:id', true, preferenciaController.delete.bind(preferenciaController))

export default {
  path: '/preferencias',
  router: preferenciaRouter.router
}
