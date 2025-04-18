export interface IUser {
  id: number
  name: string
  email: string
  password: string
}

export type estadoUser = 'get' | 'post' | 'put' | 'delete' | 'patch'
