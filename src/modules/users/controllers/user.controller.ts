// controllers/user.controller.ts

import { Request, Response } from 'express'
import { Controller } from '@src/types/baseController'
import { Exception } from '@src/types/baseException'

import { UserService } from '../services/user.service'
import { PrismaUserRepository } from '../repositories/user.repository'

const userService = new UserService(new PrismaUserRepository())

export class UserController extends Controller {
  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getAll()
      this.successResponse(req, res, users, 'Lista de usuarios')
    } catch (error) {
      this.errorResponse(res, error)
    }
  }

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id)
      if (isNaN(id)) throw new Exception('ID no válido', 400)

      const user = await userService.getById(id)
      if (user == null) throw new Exception('Usuario no encontrado', 404)

      this.successResponse(req, res, user, 'Usuario encontrado')
    } catch (error) {
      this.errorResponse(res, error)
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      // const { nombre, apellidos, email, username, password } = req.body
      // if (!nombre || !email || !username || !password) {
      //   throw new Exception('Faltan campos obligatorios', 400)
      // }

      const newUser = await userService.register(req.body)
      this.successResponse(req, res, newUser, 'Usuario creado', 201)
    } catch (error) {
      this.errorResponse(res, error)
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id)
      if (isNaN(id)) throw new Exception('ID no válido', 400)

      const updated = await userService.update(id, req.body)
      this.successResponse(req, res, updated, 'Usuario actualizado')
    } catch (error) {
      this.errorResponse(res, error)
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id)
      if (isNaN(id)) throw new Exception('ID no válido', 400)

      await userService.remove(id)
      this.successResponse(req, res, null, 'Usuario borrado', 204)
    } catch (error) {
      this.errorResponse(res, error)
    }
  }
}
