import { CreateUserUseCase } from '../create-user'
import { KnexUsersRepository } from '@/repositories/knex/knex-users-repository'

export function makeCreateUserUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new CreateUserUseCase(usersRepository)

  return useCase
}
