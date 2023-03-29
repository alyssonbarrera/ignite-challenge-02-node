import { User } from '@/entities/User'
import { CreateUserDTO } from '@/dtos/create-user-dto'

export interface UsersRepository {
  create(data: CreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}
