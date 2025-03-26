// import { PrismaClient } from '@prisma/client';
// import { UserDTO } from '../dtos/users.dto';

// const prisma = new PrismaClient();

// export class UserRepository {
//     public async getAllUsers(): Promise<UserDTO> {
//         return prisma.user.findMany();
//     }

//     public async getUserById(id: number) {
//         // return prisma.user.findUnique({ where: { id } });
//     }

//     public async createUser(data: UserDTO) {
//         // return prisma.user.create({ data });
//     }

//     public async updateUser(id: number, data: UserDTO) {
//         // return prisma.user.update({ where: { id }, data });
//     }

//     public async deleteUser(id: number) {
//         // return prisma.user.delete({ where: { id } });
//     }
// }
