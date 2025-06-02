// routes/empresa.routes.ts
import { createBaseRouter } from '@src/types/baseRouter'
import { EmpresaController } from '../controllers/empresa.controller'

const empresaRouter = createBaseRouter()
const empresaController = new EmpresaController()

empresaRouter.get('/', true, empresaController.findAll.bind(empresaController))
empresaRouter.get('/:id', true, empresaController.findById.bind(empresaController))
empresaRouter.post('/', true, empresaController.create.bind(empresaController))
empresaRouter.put('/:id', true, empresaController.update.bind(empresaController))
empresaRouter.delete('/:id', true, empresaController.delete.bind(empresaController))

export default {
  path: '/empresas',
  router: empresaRouter.router
}
