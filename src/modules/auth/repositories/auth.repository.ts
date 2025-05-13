import { PrismaClient } from '@prisma/client'
// import { UserDTO } from '../dtos/users.dto'

const prisma = new PrismaClient()

export class AuthRepository {
  //   public async findAll (): Promise<UserDTO> {
  //     return await prisma.user.findMany()
  //   }

  public async existUserByEmail (email: string): Promise<Boolean> {
    const user = await prisma.user.findUnique({ where: { email } })
    return user !== null
  }

  public async registUser (data: any): Promise<any> {
    return await prisma.user.create({ data })
  }

  //   public async update (id: number, data: UserDTO) {
  // return prisma.user.update({ where: { id }, data });
  //   }

  //   public async delete (id: number) {
  //     // return prisma.user.delete({ where: { id } });
  //   }
}
