import { Request, Response, NextFunction } from 'express'
import { decodedToken } from '@src/types'
import jwt from 'jsonwebtoken'
import { Controller } from '@src/types/baseController' // si este es el alias correcto

// Middleware que extiende el controlador base para usar errorResponse
class AuthMiddleware extends Controller {
  public authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
      // 1. Obtener el token del header Authorization
      const authHeader = req.headers.authorization
      if (authHeader === undefined) {
        return this.errorResponse(res, null, 'Token no proporcionado', 403)
      }

      // 2. Verificar que el formato sea "Bearer <token>"
      const parts = authHeader.split(' ')
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return this.errorResponse(res, null, 'Formato de token inválido', 403)
      }

      const token = parts[1]

      // 3. Verificar el token
      jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err != null) {
          return this.errorResponse(res, err, 'Token inválido', 403)
        }

        // 4. Guardar el payload en req.user y continuar con next()
        const content = decoded as decodedToken
        req.user = Number(content.userId)
        next()
      })
    } catch (error) {
      this.errorResponse(res, error, 'Error en la autenticación')
    }
  }
}

export const authMiddleware = new AuthMiddleware().authenticate
