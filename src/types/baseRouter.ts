import { Router, RequestHandler } from 'express'
import { BaseRouter } from '@src/types'
import { authMiddleware } from '@modules/auth/middlewares/auth.middleware'

export const createBaseRouter = (): BaseRouter => {
  const router = Router()

  const baseRouter = {
    get (path: string, authorized: boolean, ...handlers: RequestHandler[]) {
      const middleware = authorized ? [authMiddleware] : []
      router.get(path, ...middleware, ...handlers)
    },
    post (path: string, authorized: boolean, ...handlers: RequestHandler[]) {
      const middleware = authorized ? [authMiddleware] : []
      router.post(path, ...middleware, ...handlers)
    },
    put (path: string, authorized: boolean, ...handlers: RequestHandler[]) {
      const middleware = authorized ? [authMiddleware] : []
      router.put(path, ...middleware, ...handlers)
    },
    delete (path: string, authorized: boolean, ...handlers: RequestHandler[]) {
      const middleware = authorized ? [authMiddleware] : []
      router.delete(path, ...middleware, ...handlers)
    },
    patch (path: string, authorized: boolean, ...handlers: RequestHandler[]) {
      const middleware = authorized ? [authMiddleware] : []
      router.patch(path, ...middleware, ...handlers)
    },
    use: router.use.bind(router),
    router: router
  }

  return baseRouter
}
