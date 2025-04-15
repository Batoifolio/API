// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function main(): Promise<void> {
//   // Insertar registros en la tabla rama
//   await prisma.rama.createMany({
//     data: [
//       { id: 1, nombre: 'Informática', borrado: false },
//       { id: 2, nombre: 'Telecomunicaciones', borrado: false },
//       { id: 3, nombre: 'Industrial', borrado: false },
//       { id: 4, nombre: 'Mecánica', borrado: false }
//     ]
//   })

//   // Insertar registros en la tabla grado
//   await prisma.grado.createMany({
//     data: [
//       { id: 1, nombre: 'Ingeniería Informática', borrado: false },
//       { id: 2, nombre: 'Ingeniería de Telecomunicaciones', borrado: false },
//       { id: 3, nombre: 'Ingeniería Industrial', borrado: false },
//       { id: 4, nombre: 'Ingeniería Mecánica', borrado: false }
//     ]
//   })

//   // Insertar registros en la tabla preferencia
//   await prisma.preferencia.createMany({
//     data: [
//       { id: 1, nombre: 'Desarrollo Web', borrado: false },
//       { id: 2, nombre: 'Desarrollo Móvil', borrado: false },
//       { id: 3, nombre: 'Desarrollo de Videojuegos', borrado: false },
//       { id: 4, nombre: 'Desarrollo de Software', borrado: false }
//     ]
//   })

//   // Insertar registros en la tabla rol
//   await prisma.rol.createMany({
//     data: [
//       { id: 1, nombre: 'Administrador', borrado: false },
//       { id: 2, nombre: 'Users', borrado: false }
//     ]
//   })

//   // Insertar registros en la tabla empresa
//   await prisma.empresa.createMany({
//     data: [
//       {
//         id: 1,
//         nombre: 'Empresa 1',
//         cif: 'A12345678',
//         direccion: 'Calle Empresa 1',
//         sector: 'Tecnología',
//         telefono: '123456789',
//         email: 'empresa1@gmail.com',
//         creadoEn: new Date('2021-06-01T00:00:00Z'),
//         borrado: false
//       },
//       {
//         id: 2,
//         nombre: 'Empresa 2',
//         cif: 'B12345678',
//         direccion: 'Calle Empresa 2',
//         sector: 'Tecnología',
//         telefono: '123456789',
//         email: 'empresa2@gmail.com',
//         creadoEn: new Date('2021-06-01T00:00:00Z'),
//         borrado: false
//       }
//     ]
//   })

//   // Insertar registros en la tabla Users
//   await prisma.user.createMany({
//     data: [
//       {
//         id: 1,
//         nombre: 'Juan',
//         apellidos: 'Pérez',
//         username: 'juanp',
//         email: 'juanp@gmail.com',
//         password: 'password1',
//         telefono: '123456789',
//         estado: 'desconectado',
//         rolId: 1,
//         empresaId: 1,
//         buscaEmpresa: false,
//         visibilidad: true,
//         pueblo: 'Madrid',
//         gradoId: 1,
//         ramaId: 1,
//         creadoEn: new Date('2021-06-01T00:00:00Z'),
//         borrado: false
//       },
//       {
//         id: 2,
//         nombre: 'Ana',
//         apellidos: 'García',
//         username: 'anag',
//         email: 'anag@gmail.com',
//         password: 'password2',
//         telefono: '987654321',
//         estado: 'desconectado',
//         rolId: 2,
//         empresaId: 2,
//         buscaEmpresa: false,
//         visibilidad: true,
//         pueblo: 'Barcelona',
//         gradoId: 2,
//         ramaId: 2,
//         creadoEn: new Date('2021-06-01T00:00:00Z'),
//         borrado: false
//       },
//       {
//         id: 3,
//         nombre: 'Luis',
//         apellidos: 'Martínez',
//         username: 'luism',
//         email: 'luism@gmail.com',
//         password: 'password3',
//         telefono: '123123123',
//         estado: 'desconectado',
//         rolId: 2,
//         empresaId: 1,
//         buscaEmpresa: false,
//         visibilidad: true,
//         pueblo: 'Valencia',
//         gradoId: 3,
//         ramaId: 3,
//         creadoEn: new Date('2021-06-01T00:00:00Z'),
//         borrado: false
//       },
//       {
//         id: 4,
//         nombre: 'María',
//         apellidos: 'López',
//         username: 'marial',
//         email: 'marial@gmail.com',
//         password: 'password4',
//         telefono: '321321321',
//         estado: 'desconectado',
//         rolId: 1,
//         empresaId: 2,
//         buscaEmpresa: false,
//         visibilidad: true,
//         pueblo: 'Sevilla',
//         gradoId: 4,
//         ramaId: 4,
//         creadoEn: new Date('2021-06-01T00:00:00Z'),
//         borrado: false
//       }
//     ]
//   })

//   // Insertar registros en la tabla refresh_token
//   await prisma.refreshToken.createMany({
//     data: [
//       { id: 1, userId: 1, token: 'token1', ipAccess: '192.168.1.1', userAgent: 'Mozilla/5.0' },
//       { id: 2, userId: 2, token: 'token2', ipAccess: '192.168.1.2', userAgent: 'Mozilla/5.0' },
//       { id: 3, userId: 3, token: 'token3', ipAccess: '192.168.1.3', userAgent: 'Mozilla/5.0' },
//       { id: 4, userId: 4, token: 'token4', ipAccess: '192.168.1.4', userAgent: 'Mozilla/5.0' }
//     ]
//   })

//   // Insertar registros en la tabla Users_preferencia
//   await prisma.usersPreferencia.createMany({
//     data: [
//       { userId: 1, preferenciaId: 1, borrado: false },
//       { userId: 2, preferenciaId: 2, borrado: false },
//       { userId: 3, preferenciaId: 3, borrado: false },
//       { userId: 4, preferenciaId: 4, borrado: false }
//     ]
//   })

//   // Insertar registros en la tabla publicacion
//   await prisma.publicacion.createMany({
//     data: [
//       { id: 1, userId: 1, contenido: 'Contenido de la publicación 1', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 2, userId: 2, contenido: 'Contenido de la publicación 2', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 3, userId: 3, contenido: 'Contenido de la publicación 3', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 4, userId: 4, contenido: 'Contenido de la publicación 4', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false }
//     ]
//   })

//   // Insertar registros en la tabla imagen_publicacion
//   await prisma.imagenPublicacion.createMany({
//     data: [
//       { id: 1, publicacionId: 1, url: 'http://imagen1.com', borrado: false },
//       { id: 2, publicacionId: 2, url: 'http://imagen2.com', borrado: false },
//       { id: 3, publicacionId: 3, url: 'http://imagen3.com', borrado: false },
//       { id: 4, publicacionId: 4, url: 'http://imagen4.com', borrado: false }
//     ]
//   })

//   // Insertar registros en la tabla bloqueos
//   await prisma.bloqueo.createMany({
//     data: [
//       { id: 1, userId: 1, userBloqueadoId: 2, fechaBloqueado: new Date('2021-06-01T00:00:00Z'), fechaDesbloqueado: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 2, userId: 2, userBloqueadoId: 3, fechaBloqueado: new Date('2021-06-01T00:00:00Z'), fechaDesbloqueado: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 3, userId: 3, userBloqueadoId: 4, fechaBloqueado: new Date('2021-06-01T00:00:00Z'), fechaDesbloqueado: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 4, userId: 4, userBloqueadoId: 1, fechaBloqueado: new Date('2021-06-01T00:00:00Z'), fechaDesbloqueado: new Date('2021-06-01T00:00:00Z'), borrado: false }
//     ]
//   })

//   // Insertar registros en la tabla peticion_segimiento
//   await prisma.peticionSeguimiento.createMany({
//     data: [
//       { id: 1, userOrigen: 1, userDestino: 2, estado: 'Pendiente', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 2, userOrigen: 2, userDestino: 3, estado: 'Pendiente', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 3, userOrigen: 3, userDestino: 4, estado: 'Pendiente', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 4, userOrigen: 4, userDestino: 1, estado: 'Pendiente', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false }
//     ]
//   })

//   // Insertar registros en la tabla conversacion
//   await prisma.conversacion.createMany({
//     data: [
//       { id: 1, user1Id: 1, user2Id: 2, creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 2, user1Id: 2, user2Id: 3, creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 3, user1Id: 3, user2Id: 4, creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 4, user1Id: 4, user2Id: 1, creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false }
//     ]
//   })

//   // Insertar registros en la tabla mensaje
//   await prisma.mensaje.createMany({
//     data: [
//       { id: 1, conversacionId: 1, remitenteId: 1, contenido: 'Mensaje 1', estado: 'enviado', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 2, conversacionId: 2, remitenteId: 2, contenido: 'Mensaje 2', estado: 'enviado', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 3, conversacionId: 3, remitenteId: 3, contenido: 'Mensaje 3', estado: 'enviado', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false },
//       { id: 4, conversacionId: 4, remitenteId: 4, contenido: 'Mensaje 4', estado: 'enviado', creadoEn: new Date('2021-06-01T00:00:00Z'), borrado: false }
//     ]
//   })
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
