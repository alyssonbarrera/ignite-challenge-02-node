import { UsersRepository } from '@/repositories/users-repository'
import { AppError } from './errors/AppError'

export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return {
      user,
    }
  }
}
