// import { ExceptionBadFormatField } from '@src/types/baseExceptionBadFormatField'
import { UserService } from '@modules/users/services/user.service'
import { UserInterface } from '@modules/users/interfaces/user.interface'
import { Exception } from '@src/types/baseException'
import { ExceptionMissField } from '@src/types/baseExceptionMissField'

export class AuthService {
  private readonly userService = new UserService()

  public async register (data: Partial<UserInterface>): Promise<UserInterface> {
    return await this.userService.create(data)
  }

  public async login (data: { email?: string, username?: string, password: string }): Promise<UserInterface> {
    const { email, username, password } = data
    let user: UserInterface | null = null

    if (email !== undefined && email !== null) {
      user = await this.userService.findByEmail(email)
    }
    if (user === null && username !== undefined && username !== null) {
      user = await this.userService.findByUsername(username)
    }

    if (user === null) {
      throw new Exception('Usuario no encontrado', 401)
    }

    if (password === undefined && password === null) {
      throw new ExceptionMissField('Password')
    }

    if (!await user.verifyPassword(password)) {
      throw new Exception('Contraseña incorrecta', 401)
    }
    return user
  }
}
