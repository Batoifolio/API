#!/bin/bash

# Verifica que se haya pasado un nombre
if [ -z "$2" ]; then
  echo "Uso: $0 <pathBase> <nombre>"
  exit 1
fi

NOMBRE=$2
BASE_DIR="$1../src/modules/$NOMBRE"

# Derivar formas de nombre
nombre=$(echo "$NOMBRE" | tr '[:upper:]' '[:lower:]')
Nombre="$(tr '[:lower:]' '[:upper:]' <<< ${nombre:0:1})${nombre:1}"
nombreSingular="${nombre::-1}"
NombreSingular="$(tr '[:lower:]' '[:upper:]' <<< ${nombreSingular:0:1})${nombreSingular:1}"

# Extensiones y carpetas
CARPETAS=("controllers" "interfaces" "models" "repositories" "routes" "services")
ARCHIVOS=(
  "$nombreSingular.controller.ts"
  "$nombreSingular.interface.ts"
  "$nombreSingular.model.ts"
  "$nombreSingular.repository.ts"
  "$nombreSingular.routes.ts"
  "$nombreSingular.service.ts"
)

# Crear base
mkdir -p "$BASE_DIR"

# Crear carpetas y archivos
for i in "${!CARPETAS[@]}"; do
  DIR="${CARPETAS[$i]}"
  FILE="${ARCHIVOS[$i]}"
  mkdir -p "$BASE_DIR/$DIR"
  
  # Si es controller, escribe contenido por defecto
  if [[ "$DIR" == "controllers" ]]; then
    cat << EOF > "$BASE_DIR/$DIR/$FILE"
import { Request, Response } from 'express'
import { ${NombreSingular}Service } from '../services/${nombreSingular}.service'
import { Controller } from '@src/types/baseController'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'

export class ${NombreSingular}Controller extends Controller {
  private readonly ${nombreSingular}Service = new ${NombreSingular}Service()

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryPaginate = this.getQueryPaginate(req)
      const { data, pagination } = await this.${nombreSingular}Service.findAll(queryPaginate)

      this.successResponse(req, res, data, '${Nombre} obtenidas correctamente', 200, pagination)
    } catch (error) {
      this.errorResponse(res, error, 'Error al obtener ${nombre}')
    }
  }

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const ${nombreSingular} = await this.${nombreSingular}Service.findById(id)

      if (${nombreSingular} != null) {
        this.successResponse(req, res, ${nombreSingular}, '${NombreSingular} obtenida correctamente', 200)
      } else {
        this.errorResponse(res, null, '${NombreSingular} no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(res, error, 'Error al obtener la ${nombreSingular}')
    }
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre } = req.body

      if (nombre != null) {
        const ${nombreSingular} = await this.${nombreSingular}Service.create(nombre)
        this.successResponse(req, res, ${nombreSingular}, '${NombreSingular} creada correctamente', 201)
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(res, error, 'Error al crear la ${nombreSingular}')
      }
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const { nombre } = req.body

      if (nombre != null) {
        const ${nombreSingular} = await this.${nombreSingular}Service.update(id, nombre)

        if (${nombreSingular} != null) {
          this.successResponse(req, res, ${nombreSingular}, '${NombreSingular} actualizada correctamente', 200)
        } else {
          this.errorResponse(res, null, '${NombreSingular} no encontrada', 404)
        }
      } else {
        throw new ExceptionMissField('nombre')
      }
    } catch (error) {
      if (error instanceof ExceptionMissField) {
        this.errorResponse(res, error, error.message, error.statusCode)
      } else {
        this.errorResponse(res, error, 'Error al actualizar la ${nombreSingular}')
      }
    }
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id)
      const ${nombreSingular} = await this.${nombreSingular}Service.delete(id)

      if (${nombreSingular} != null) {
        this.successResponse(req, res, ${nombreSingular}, '${NombreSingular} eliminada correctamente', 200)
      } else {
        this.errorResponse(res, null, '${NombreSingular} no encontrada', 404)
      }
    } catch (error) {
      this.errorResponse(res, 'Error al eliminar la ${nombreSingular}')
    }
  }
}
EOF
  elif [[ "$DIR" == "interfaces" ]]; then
    cat << EOF > "$BASE_DIR/$DIR/$FILE"
export interface ${NombreSingular}Interface {
  id: number
  borrado?: boolean
}
EOF

    elif [[ "$DIR" == "models" ]]; then
    cat << EOF > "$BASE_DIR/$DIR/$FILE"
// models/${nombreSingular}.model.ts
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { ${NombreSingular}Interface } from '../interfaces/${nombreSingular}.interface'

const prisma = new PrismaClient()

export class ${NombreSingular} implements ${NombreSingular}Interface {
  id: number
  // TODO campos de ${NombreSingular}
  borrado: boolean

  static schema = z.object({
    id: z.number().int(),
    // TODO campos de ${NombreSingular}
    borrado: z.boolean().optional().default(false)
  })

  constructor (
    id: number,
    // TODO campos de ${NombreSingular}
    borrado: boolean = false
  ) {
    this.id = id
    // TODO campos de ${NombreSingular}
    this.borrado = borrado
  }

  public static async count (): Promise<number> {
    return await prisma.${nombreSingular}.count({ where: { borrado: false } })
  }

  public static async findAll (): Promise<${NombreSingular}[]> {
    const ${nombre} = await prisma.${nombreSingular}.findMany({
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return ${nombre}.map(${nombreSingular} => ${NombreSingular}.mapToModel(${nombreSingular}))
  }

  public static async findById (id: number): Promise<${NombreSingular} | null> {
    const ${nombreSingular} = await prisma.${nombreSingular}.findFirst({
      where: { id, borrado: false }
    })
    return (${nombreSingular} != null) ? ${NombreSingular}.mapToModel(${nombreSingular}) : null
  }

  public static async create (data: Omit<z.infer<typeof ${NombreSingular}.schema>, 'id' | 'creadoEn' | 'ultimaConexion'>): Promise<${NombreSingular}> {
    const new${NombreSingular} = await prisma.${nombreSingular}.create({
      data: {
        // TODO campos de ${NombreSingular}
        borrado: data.borrado
      }
    })
    return ${NombreSingular}.mapToModel(new${NombreSingular})
  }

  public static async update (id: number, data: Partial<Omit<z.infer<typeof ${NombreSingular}.schema>, 'id'>>): Promise<${NombreSingular} | null> {
    const ${nombreSingular} = await prisma.${nombreSingular}.update({
      where: { id },
      data: {
        ...data
      }

    })
    return ${nombreSingular} !== null && ${nombreSingular} !== undefined ? ${NombreSingular}.mapToModel(${nombreSingular}) : null
  }

  public static async delete (id: number): Promise<${NombreSingular} | null> {
    const ${nombreSingular} = await prisma.${nombreSingular}.update({
      where: { id },
      data: { borrado: true }
    })
    return ${NombreSingular}.mapToModel(${nombreSingular})
  }

  public static async findAllPaginate (page: number, take: number): Promise<${NombreSingular}[]> {
    const skip = (page - 1) * take
    const ${nombre} = await prisma.${nombreSingular}.findMany({
      skip,
      take,
      where: { borrado: false },
      orderBy: { id: 'asc' }
    })
    return ${nombre}.map(${nombreSingular} => ${NombreSingular}.mapToModel(${nombreSingular}))
  }

  public static mapToModel (data: any): ${NombreSingular} {
    const parsed = ${NombreSingular}.schema.parse(data)
    return new ${NombreSingular}(
      parsed.id,
      // TODO campos de ${NombreSingular}
      parsed.borrado
    )
  }
}
EOF


  elif [[ "$DIR" == "repositories" ]]; then
    cat << EOF > "$BASE_DIR/$DIR/$FILE"
// repositories/${nombreSingular}.repository.ts
import { ${NombreSingular} } from '@src/modules/${nombre}/models/${nombreSingular}.model'
import { PaginationResult, QueryPaginate } from '@src/types'
import { Repository } from '@src/types/baseRepository'

export class ${NombreSingular}Repository extends Repository {
  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<${NombreSingular}>> {
    return await this.paginate<${NombreSingular}>({
      queryPaginate,
      getData: async () => await ${NombreSingular}.findAllPaginate(queryPaginate.page, queryPaginate.limit),
      getTotal: async () => await ${NombreSingular}.count()
    })
  }

  async findById (id: number): Promise<${NombreSingular} | null> {
    return await ${NombreSingular}.findById(id)
  }

  async create (data: any): Promise<${NombreSingular}> {
    return await ${NombreSingular}.create(data)
  }

  async update (id: number, data: any): Promise<${NombreSingular} | null> {
    return await ${NombreSingular}.update(id, data)
  }

  async delete (id: number): Promise<${NombreSingular} | null> {
    return await ${NombreSingular}.delete(id)
  }
}
EOF


  elif [[ "$DIR" == "routes" ]]; then
    cat << EOF > "$BASE_DIR/$DIR/$FILE"
// routes/${nombreSingular}.routes.ts
import { createBaseRouter } from '@src/types/baseRouter'
import { ${NombreSingular}Controller } from '../controllers/${nombreSingular}.controller'

const ${nombreSingular}Router = createBaseRouter()
const ${nombreSingular}Controller = new ${NombreSingular}Controller()

${nombreSingular}Router.get('/', false, ${nombreSingular}Controller.findAll.bind(${nombreSingular}Controller))
${nombreSingular}Router.get('/:id', false, ${nombreSingular}Controller.findById.bind(${nombreSingular}Controller))
${nombreSingular}Router.post('/', false, ${nombreSingular}Controller.create.bind(${nombreSingular}Controller))
${nombreSingular}Router.put('/:id', false, ${nombreSingular}Controller.update.bind(${nombreSingular}Controller))
${nombreSingular}Router.delete('/:id', false, ${nombreSingular}Controller.delete.bind(${nombreSingular}Controller))

export default {
  path: '/${nombre}',
  router: ${nombreSingular}Router.router
}
EOF


  elif [[ "$DIR" == "services" ]]; then
    cat << EOF > "$BASE_DIR/$DIR/$FILE"
// services/${nombreSingular}.service.ts
import { PaginationResult, QueryPaginate } from '@src/types'
import { ExceptionBadFormatField } from '@src/types/baseExceptionBadFormatField'
import { ${NombreSingular}Repository } from '../repositories/${nombreSingular}.repository'
import { ${NombreSingular}Interface } from '../interfaces/${nombreSingular}.interface'

export class ${NombreSingular}Service {
  private readonly ${nombreSingular}Repository = new ${NombreSingular}Repository()

  async findAll (queryPaginate: QueryPaginate): Promise<PaginationResult<${NombreSingular}Interface>> {
    return await this.${nombreSingular}Repository.findAll(queryPaginate)
  }

  async findById (id: number): Promise<${NombreSingular}Interface | null> {
    return await this.${nombreSingular}Repository.findById(id)
  }

  async create (data: Partial<${NombreSingular}Interface>): Promise<${NombreSingular}Interface> {
    // TODO logic de validacion
    // if ((await this.${nombreSingular}Repository.findByEmail(data.email as string)) != null) {
    //   throw new ExceptionBadFormatField('Email ya existe')
    // }
    
    return await this.${nombreSingular}Repository.create(data)
  }

  async update (id: number, data: Partial<${NombreSingular}Interface>): Promise<${NombreSingular}Interface | null> {
    return await this.${nombreSingular}Repository.update(id, data)
  }

  async delete (id: number): Promise<${NombreSingular}Interface | null> {
    return await this.${nombreSingular}Repository.delete(id)
  }
}
EOF


  else
    touch "$BASE_DIR/$DIR/$FILE"
  fi
done

echo "✅ Estructura creada correctamente en $BASE_DIR"
