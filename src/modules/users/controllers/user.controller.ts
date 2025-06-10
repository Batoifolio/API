// controllers/users.controller.ts
import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { Controller } from '@src/types/baseController'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'
import { User } from '../models/user.model'

export class UsersController extends Controller {
  private readonly userService = new UserService()

  public filterAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryPaginate = this.getQueryPaginate(req)
      const { data, pagination } = await this.userService.findAll(queryPaginate)

      this.successResponse(req, res, data, 'Usuarios obtenidos correctamente', 200, pagination)
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener los usuarios', 500)
    }
  }

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryPaginate = this.getQueryPaginate(req)
      const { data, pagination } = await this.userService.findAll(queryPaginate)

      this.successResponse(req, res, data, 'Usuarios obtenidos correctamente', 200, pagination)
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener los usuarios', 500)
    }
  }

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const user = await this.userService.findById(id)

      if (user != null) {
        this.successResponse(req, res, user, 'Usuario obtenido correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Usuario no encontrado', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener el usuario', 500)
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = User.schema.omit({ id: true, creadoEn: true, ultimaConexion: true }).safeParse(req.body)

      if (!parsed.success) {
        const missingFields = parsed.error.errors.map(err => err.path.join('.')).join(', ')
        throw new ExceptionMissField(missingFields)
      }

      const newUser = await this.userService.create(parsed.data)
      this.successResponse(req, res, newUser, 'Usuario creado correctamente', 201)
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(req, res, error, 'Campos faltantes o inválidos: ', error.statusCode)
      } else {
        this.errorResponse(req, res, error, 'Error al crear el usuario', 500)
      }
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const data = req.body

      // gradoId tiene que ser un numero, si no lo es, se lanza un error
      if (data.gradoId !== undefined && typeof data.gradoId !== 'number') {
        throw new ExceptionMissField('gradoId debe ser un número')
      }
      if (data.ramaId !== undefined && typeof data.ramaId !== 'number') {
        throw new ExceptionMissField('ramaId debe ser un número')
      }

      const user = await this.userService.update(id, data)

      if (user != null) {
        this.successResponse(req, res, user, 'Usuario actualizado correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Usuario no encontrado', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al actualizar el usuario', 500)
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const user = await this.userService.delete(id)

      if (user != null) {
        this.successResponse(req, res, user, 'Usuario eliminado correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Usuario no encontrado', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al eliminar el usuario', 500)
    }
  }

  public curriculum = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const data = req.body

      // vamor a recojer los datos para hacer le curriculum
      const titulo = data.titulo
      const resumen = data.resumen
      const experiencia = data.experiencia
      const educacion = data.educacion
      const habilidades = data.habilidades

      // validamos que los datos sean correctos
      if (titulo === undefined || titulo === null || typeof titulo !== 'string') {
        throw new ExceptionMissField('El título es obligatorio y debe ser una cadena de texto')
      }
      if (resumen === undefined || resumen === null || typeof resumen !== 'string') {
        throw new ExceptionMissField('El resumen es obligatorio y debe ser una cadena de texto')
      }
      if (!Array.isArray(experiencia)) {
        throw new ExceptionMissField('La experiencia debe ser un array')
      }
      if (!Array.isArray(educacion)) {
        throw new ExceptionMissField('La educación debe ser un array')
      }
      if (!Array.isArray(habilidades)) {
        throw new ExceptionMissField('Las habilidades deben ser un array')
      }

      // creamos un objeto con los datos del curriculum
      const curriculumData = {
        titulo,
        resumen,
        experiencia: experiencia.map((exp: any) => {
          const fechaInicio = new Date(exp.fechaInicio)
          const fechaFin = new Date(exp.fechaFin)

          if (typeof exp.empresa !== 'string' || exp.empresa.trim() === '') {
            throw new ExceptionMissField('La empresa en la experiencia debe ser una cadena de texto')
          }
          if (typeof exp.cargo !== 'string' || exp.cargo.trim() === '') {
            throw new ExceptionMissField('El cargo en la experiencia debe ser una cadena de texto')
          }

          if (fechaInicio !== undefined && fechaFin !== undefined && (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime()))) {
            throw new ExceptionMissField(`Las fechas en la experiencia: ${exp.empresa as string} deben ser válidas`)
          }

          return {
            id: exp.id,
            empresa: exp.empresa,
            cargo: exp.cargo,
            descripcion: exp.descripcion,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
          }
        }),
        educacion: educacion.map((edu: any) => {
          const fechaInicio = new Date(edu.fechaInicio)
          const fechaFin = new Date(edu.fechaFin)

          if (typeof edu.institucion !== 'string' || edu.institucion.trim() === '') {
            throw new ExceptionMissField('La institución en la educación debe ser una cadena de texto')
          }
          if (typeof edu.titulo !== 'string' || edu.titulo.trim() === '') {
            throw new ExceptionMissField('El título en la educación debe ser una cadena de texto')
          }

          if (fechaInicio !== undefined && fechaFin !== undefined && (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime()))) {
            throw new ExceptionMissField(`Las fechas en la educación: ${edu.institucion as string} deben ser válidas`)
          }

          return {
            id: edu.id,
            institucion: edu.institucion,
            titulo: edu.titulo,
            descripcion: edu.descripcion,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
          }
        }),
        habilidades,
        idiomas: Array.isArray(data.idiomas) ? data.idiomas.map((idioma: any) => {
          if (typeof idioma.idioma !== 'string' || typeof idioma.nivel !== 'string') {
            throw new ExceptionMissField('Cada idioma debe tener un idioma y un nivel')
          }
          return idioma
        }) : []
      }

      const curriculum = await this.userService.updateCurriculum(id, curriculumData)

      if (curriculum != null) {
        this.successResponse(req, res, curriculum, 'Curriculum actualizado correctamente', 200)
      } else {
        this.errorResponse(req, res, null, 'Curriculum no encontrado', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al actualizar el Curriculum', 500)
    }
  }

  public findByIdCurriculum = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const user = await this.userService.findByIdCurriculum(id)

      if (user != null) {
        this.successResponse(req, res, user, `Curriculum del usuario ${id} obtenido correctamente`, 200)
      } else {
        this.errorResponse(req, res, null, 'Usuario no encontrado', 404)
      }
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener el usuario', 500)
    }
  }

  public generatePDF = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      await this.userService.generatePDF(id)

      // if (user != null) {
      // this.successResponse(req, res, user, `Curriculum del usuario ${id} obtenido correctamente`, 200)
      // } else {
      this.errorResponse(req, res, null, 'Usuario no encontrado', 404)
      // }
    } catch (error) {
      this.errorResponse(req, res, error, 'Error al obtener el usuario', 500)
    }
  }
}
