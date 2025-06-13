// scripts/seed.ts

import { PrismaClient } from '@prisma/client'
import { User } from '../src/modules/users/models/user.model'

const prisma = new PrismaClient()

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

  const adminRole = await prisma.rol.create({
    data: {
      nombre: 'admin'
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
      rolId: adminRole.id
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
      empresaId: empresa1.id,
      buscaEmpresa: true,
      descripcion: 'Estudiante de DAW interesada en prácticas.',
      telefono: '611111111'
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
      ramaId: rama1.id
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
      telefono: '622222222'
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
      telefono: '622222222'
    }
  })

  await seedUsers(30)

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
  const password = '1aCa'

  for (let i = 0; i < numero; i++) {
    const nombre = nombres[i % nombres.length]
    const apellido1 = apellidos[i % apellidos.length]
    const apellido2 = apellidos[Math.floor(Math.random() * apellidos.length)]
    const username = `${nombre.toLowerCase()}.${apellido1.toLowerCase()}${i}`
    const email = `${username}@batoifolio.com`
    const pueblo = pueblos[i % pueblos.length]
    const telefono = `62222${(1000 + i).toString().padStart(4, '0')}`

    await prisma.user.create({
      data: {
        nombre,
        apellidos: `${apellido1} ${apellido2}`,
        username,
        email,
        password,
        pueblo,
        gradoId: grado1,
        ramaId: rama1,
        telefono
      }
    })

    console.log(`Usuario ${username} creado`)
  }

  console.log('Todos los usuarios han sido creados')
}
