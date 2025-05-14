// import { ExceptionBadFormatField } from '@src/types/baseExceptionBadFormatField'
import { UserService } from '@modules/users/services/user.service'
import { UserInterface } from '@modules/users/interfaces/user.interface'

export class AuthService {
  private readonly userService = new UserService()

  public async register (data: Partial<UserInterface>): Promise<UserInterface> {
    return await this.userService.create(data)
  }
}
