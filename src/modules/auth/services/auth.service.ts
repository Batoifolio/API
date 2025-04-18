import { Exception } from '@src/types/baseException'
import { AuthRepository } from '../repositories/auth.repository'

export class AuthService {
  private readonly authRepository = new AuthRepository()

  public async register (name: string, email: string, password: string): Promise<any> {
    // Verificar si el nombre es válido
    const nameRegex = /^[a-zA-Z\s]+$/
    if (!nameRegex.test(name)) {
      throw new Exception('El nombre solo puede contener letras y espacios', 400)
    }

    // Verificar si el formato de email es válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Exception('Formato de email inválido', 400)
    }

    // Verificar si el email ya está registrado
    const exist = await this.authRepository.existUserByEmail(email)
    if (exist === true) {
      throw new Exception('El email ya está registrado', 409)
    }

    // Verificar la fortaleza de la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!passwordRegex.test(password)) {
      throw new Exception('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número', 400)
    }

    // Registrar el usuario
    const user = await this.authRepository.registUser({
      nombre: name,
      email,
      password,
      estado: 'activo',
      ultimaConexion: new Date(),
      creadoEn: new Date()
    })

    return user
  }
}
