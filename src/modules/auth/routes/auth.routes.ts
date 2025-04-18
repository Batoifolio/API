import { createBaseRouter } from '@src/types/baseRouter'
import { AuthController } from '../controllers/auth.controller'

const authRouter = createBaseRouter()
const authController = new AuthController()

authRouter.post('/register', false, authController.register.bind(authController))
// authRouter.get('/login', false, authController.login.bind(authController))
// authRouter.get('/logout', true, authController.logout.bind(authController))

export default {
  path: '/',
  router: authRouter.router
}
