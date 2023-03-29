import { compare } from 'bcryptjs'
import { User } from '@/entities/User'
import { AppError } from './errors/AppError'
import { UsersRepository } from '@/repositories/users-repository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new AppError('Invalid credentials', 401)
    }

    return {
      user,
    }
  }
}
