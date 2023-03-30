import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { AppError } from './errors/AppError'
import { CreateUserDTO } from '@/dtos/create-user-dto'
import { UsersRepository } from '@/repositories/users-repository'

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: CreateUserDTO) {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new AppError('User already exists', 409)
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      id: randomUUID(),
      name,
      email,
      password: password_hash,
    })

    return {
      user,
    }
  }
}
