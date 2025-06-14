// scripts/seed.ts

import { PrismaClient } from '@prisma/client'
import { User } from '../src/modules/users/models/user.model'

const prisma = new PrismaClient()
const fotoPerfil = '/default-avatar.png'

async function main (): Promise<void> {
  // Insertar Ramas
  const rama1 = await prisma.rama.create({ data: { nombre: 'Informática' } })
  const rama2 = await prisma.rama.create({ data: { nombre: 'Administración' } })

  // Insertar Grados
  await prisma.grado.create({ data: { nombre: '1 DAW' } })
  await prisma.grado.create({ data: { nombre: '1 DAM' } })
  const grado1 = await prisma.grado.create({ data: { nombre: '2 DAW' } })
  const grado2 = await prisma.grado.create({ data: { nombre: '2 DAM' } })

  // Insertar Preferencias
  const pref1 = await prisma.preferencia.create({ data: { nombre: 'Remoto' } })
  const pref2 = await prisma.preferencia.create({ data: { nombre: 'Presencial' } })

  const adminRole = await prisma.rol.create({
    data: {
      nombre: 'admin'
    }
  })
  const reclutadoresRole = await prisma.rol.create({
    data: {
      nombre: 'reclutadores'
    }
  })

  // Insertar Empresas
  const empresa1 = await prisma.empresa.create({
    data: {
      nombre: 'Tech Solutions S.L.',
      cif: 'B12345678',
      direccion: 'Calle Falsa 123',
      sector: 'Tecnología',
      telefono: '600123123',
      email: 'info@techsolutions.com'
    }
  })

  await prisma.user.create({
    data: {
      nombre: 'Lorena',
      apellidos: 'García López',
      username: 'lorena.garcia',
      email: 'lorenaem@example.com',
      password: await User.hashPassword('1aCa'),
      pueblo: 'Alicante',
      gradoId: grado1.id,
      ramaId: rama1.id,
      rolId: reclutadoresRole.id,
      empresaId: empresa1.id,
      buscaEmpresa: false,
      descripcion: 'Encargada de reclutamiento de Tech Solutions S.L.',
      telefono: '611111111'
    }
  })

  // Insertar Usuarios
  const admin = await prisma.user.create({
    data: {
      nombre: 'admin',
      apellidos: '',
      username: 'admin',
      email: 'admin@batoifolio.com',
      password: await User.hashPassword('1aCa'),
      pueblo: 'Alicante',
      buscaEmpresa: false,
      descripcion: 'Administrar.',
      telefono: '611111111',
      rolId: adminRole.id,
      fotoPerfil
    }
  })
  console.log('Usuario administrador creado:', admin)

  const user1 = await prisma.user.create({
    data: {
      nombre: 'Ana',
      apellidos: 'García López',
      username: 'ana.garcia',
      email: 'ana@example.com',
      password: await User.hashPassword('1aCa'),
      pueblo: 'Alicante',
      gradoId: grado1.id,
      ramaId: rama1.id,
      buscaEmpresa: false,
      descripcion: 'Estudiante de DAW interesada en prácticas.',
      telefono: '611111111',
      fotoPerfil
    }
  })

  const user2 = await prisma.user.create({
    data: {
      nombre: 'Carlos',
      apellidos: 'Ruiz Fernández',
      username: 'carlos.ruiz',
      email: 'carlos@example.com',
      password: await User.hashPassword('1aCa'),
      pueblo: 'Valencia',
      gradoId: grado2.id,
      ramaId: rama1.id,
      fotoPerfil
    }
  })

  const user3 = await prisma.user.create({
    data: {
      nombre: 'Laura',
      apellidos: 'Martínez Pérez',
      username: 'laura.martinez',
      email: 'laura@example.com',
      password: await User.hashPassword('1aCa'),
      pueblo: 'Madrid',
      gradoId: grado1.id,
      ramaId: rama2.id,
      telefono: '622222222',
      fotoPerfil
    }
  })
  const jordi = await prisma.user.create({
    data: {
      nombre: 'Jordi',
      apellidos: 'Gisbert Ferriz',
      username: 'jordi.gisbert',
      email: 'jordi@batoifolio.com',
      password: await User.hashPassword('1aCa'),
      pueblo: 'Alcoy',
      gradoId: grado1.id,
      ramaId: rama1.id,
      telefono: '622222222',
      fotoPerfil
    }
  })

  await seedUsers(30)
  await seedEmpresas(5)
  await asignarEmpresasUsuarios(5, reclutadoresRole.id)

  // Relacionar Usuarios con Preferencias
  await prisma.usersPreferencia.createMany({
    data: [
      { userId: user1.id, preferenciaId: pref1.id },
      { userId: user1.id, preferenciaId: pref2.id },
      { userId: user2.id, preferenciaId: pref1.id },
      { userId: user3.id, preferenciaId: pref1.id },
      { userId: jordi.id, preferenciaId: pref1.id },
      { userId: jordi.id, preferenciaId: pref2.id }
    ]
  })

  console.log('Datos de muestra insertados correctamente.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })

async function seedUsers (numero: number): Promise<void> {
  // Aquí defines los grados y ramas que tienes creados previamente
  const grado1 = 1
  const rama1 = 1
  const nombres = ['Jordi', 'Maria', 'Carlos', 'Laura', 'Pablo', 'Lucia', 'Miguel', 'Ana', 'David', 'Sara']
  const apellidos = ['Gisbert', 'Martinez', 'Lopez', 'Garcia', 'Sanchez', 'Fernandez', 'Ruiz', 'Torres', 'Vega', 'Diaz']
  const pueblos = ['Alcoy', 'Valencia', 'Alicante', 'Castellon', 'Elche']
  const password = await User.hashPassword('1aCa')

  for (let i = 0; i < numero; i++) {
    const nombre = nombres[i % nombres.length]
    const apellido1 = apellidos[i % apellidos.length]
    const apellido2 = apellidos[Math.floor(Math.random() * apellidos.length)]
    const username = `${nombre.toLowerCase()}.${apellido1.toLowerCase()}${i}`
    const email = `${username}@batoifolio.com`
    const pueblo = pueblos[i % pueblos.length]
    const telefono = `62222${(1000 + i).toString().padStart(4, '0')}`

    const curriculum = {
      titulo: `Desarrollador ${nombre} ${apellido1}`,
      resumen: 'Desarrollador apasionado con experiencia en el diseño y desarrollo de aplicaciones web utilizando tecnologías modernas. Enfocado en ofrecer soluciones eficientes y escalables.',
      experiencia: [
        {
          id: 'a12f34bc-5678-90de-1234-56789abcdef0',
          empresa: 'Tech Solutions S.A.',
          cargo: 'Desarrollador Backend',
          descripcion: 'Desarrollo de APIs RESTful utilizando Node.js y Express, integración con bases de datos PostgreSQL, y trabajo en equipo bajo metodologías ágiles.',
          fechaInicio: '2023-01-15',
          fechaFin: '2024-12-31'
        }
      ],
      educacion: [
        {
          id: 'b084deba-2078-4485-9c92-c199dd68da1b',
          institucion: 'Universidad Politécnica de Valencia',
          titulo: 'Grado en Ingeniería Informática',
          descripcion: 'Formación en programación, estructuras de datos, bases de datos, y desarrollo de software.',
          fechaInicio: '2020-09-01',
          fechaFin: '2024-06-30'
        }
      ],
      habilidades: [
        'JavaScript',
        'TypeScript',
        'Node.js',
        'Express',
        'PostgreSQL',
        'Docker'
      ],
      idiomas: [
        {
          id: 'dc599232-ddc0-4b78-a349-fdfeea488cc8',
          nivel: 'C1',
          idioma: 'Inglés'
        },
        {
          id: '466571a0-6e77-4b16-9c30-a1b0bbdb74a9',
          nivel: 'Nativo',
          idioma: 'Español'
        }
      ]
    }

    await prisma.user.create({
      data: {
        nombre,
        apellidos: `${apellido1} ${apellido2}`,
        username,
        email,
        password,
        pueblo,
        fotoPerfil,
        gradoId: grado1,
        ramaId: rama1,
        telefono,
        curriculum
      }
    })

    console.log(`Usuario ${username} creado`)
  }

  console.log('Todos los usuarios han sido creados')
}

// el numero es los el numero de ultimos usuarios, que se les asignara una empresa aleatoria
// que ya se han creado
async function asignarEmpresasUsuarios (numero: number, rolId: number): Promise<void> {
  // Obtener los usuarios a asignar
  const usuarios = await prisma.user.findMany({
    take: numero,
    orderBy: {
      id: 'desc'
    }
  })

  // Obtener empresas sin usuarios asignados
  const empresasSinUsuarios = await prisma.empresa.findMany({
    where: {
      Users: {
        none: {}
      }
    }
  })

  if (empresasSinUsuarios.length === 0) {
    console.log('No hay empresas disponibles sin usuarios asignados.')
    return
  }

  // Limitamos al mínimo de usuarios o empresas disponibles
  const totalAsignaciones = Math.min(usuarios.length, empresasSinUsuarios.length)

  // Barajamos aleatoriamente las empresas
  const empresasAleatorias = empresasSinUsuarios.sort(() => 0.5 - Math.random())

  for (let i = 0; i < totalAsignaciones; i++) {
    const usuario = usuarios[i]
    const empresa = empresasAleatorias[i]
    const descripcion = `Reclutador de la empresa: ${empresa.nombre}`

    await prisma.user.update({
      where: { id: usuario.id },
      data: { empresaId: empresa.id, rolId, descripcion }
    })

    console.log(`Usuario ${usuario.username} asignado a la empresa ${empresa.nombre}`)
  }

  console.log('Todas las asignaciones de empresas a usuarios han sido completadas')
}

async function seedEmpresas (numero: number): Promise<void> {
  // Aquí defines los grados y ramas que tienes creados previamente
  const nombres = ['Tech Solutions S.L.', 'Innovatech S.A.', 'Global Tech Corp.', 'Future Systems Ltd.', 'Digital Ventures Inc.']
  const sectores = ['Tecnología', 'Consultoría', 'Finanzas', 'Marketing', 'Desarrollo de Software']
  const direcciones = ['Calle Falsa 123', 'Avenida Siempre Viva 456', 'Calle Mayor 789', 'Plaza del Sol 101', 'Calle Luna 202']
  const usedNames = new Set()

  for (let i = 0; i < numero; i++) {
    let nombre
    do {
      nombre = nombres[Math.floor(Math.random() * nombres.length)]
    } while (usedNames.has(nombre))
    usedNames.add(nombre)

    const sector = sectores[Math.floor(Math.random() * sectores.length)]
    const direccion = direcciones[Math.floor(Math.random() * direcciones.length)]
    const cif = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Math.floor(10000000 + Math.random() * 90000000).toString()

    await prisma.empresa.create({
      data: {
        nombre,
        sector,
        direccion,
        cif,
        telefono: `600${(100000 + i).toString().slice(1)}`,
        email: `info@${nombre.toLowerCase().replace(/\s+/g, '').replace(/\./g, '')}.com`
      }
    })

    console.log(`Empresa ${nombre} creada`)
  }

  console.log('Todas las empresas han sido creadas')
}
