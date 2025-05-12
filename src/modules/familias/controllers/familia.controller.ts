// // controllers/familia.controller.ts

// import { Request, Response } from 'express'
// import { Controller } from '@src/types/baseController'
// import { Exception } from '@src/types/baseException'

// import { FamiliaService } from '../services/familia.service'
// import { PrismaFamiliaRepository } from '../repositories/familia.repository'

// const familiaService = new FamiliaService(new PrismaFamiliaRepository())

// export class FamiliaController extends Controller {
//   public getAll = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const familias = await familiaService.getAll()
//       this.successResponse(req, res, familias, 'Lista de usuarios')
//     } catch (error) {
//       this.errorResponse(res, error)
//     }
//   }

//   public getById = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const id = Number(req.params.id)
//       if (isNaN(id)) throw new Exception('ID no válido', 400)

//       const familia = await familiaService.getById(id)
//       if (familia == null) throw new Exception('Usuario no encontrado', 404)

//       this.successResponse(req, res, familia, 'Usuario encontrado')
//     } catch (error) {
//       this.errorResponse(res, error)
//     }
//   }

//   // public create = async (req: Request, res: Response): Promise<void> => {
//   //   try {
//   //     const newFamilia = await familiaService.register(req.body)
//   //     this.successResponse(req, res, newFamilia, 'Usuario creado', 201)
//   //   } catch (error) {
//   //     this.errorResponse(res, error)
//   //   }
//   // }

//   // public update = async (req: Request, res: Response): Promise<void> => {
//   //   try {
//   //     const id = Number(req.params.id)
//   //     if (isNaN(id)) throw new Exception('ID no válido', 400)

//   //     const updated = await familiaService.update(id, req.body)
//   //     this.successResponse(req, res, updated, 'Usuario actualizado')
//   //   } catch (error) {
//   //     this.errorResponse(res, error)
//   //   }
//   // }

//   // public delete = async (req: Request, res: Response): Promise<void> => {
//   //   try {
//   //     const id = Number(req.params.id)
//   //     if (isNaN(id)) throw new Exception('ID no válido', 400)

//   //     await familiaService.remove(id)
//   //     this.successResponse(req, res, null, 'Usuario borrado', 204)
//   //   } catch (error) {
//   //     this.errorResponse(res, error)
//   //   }
//   // }
// }
