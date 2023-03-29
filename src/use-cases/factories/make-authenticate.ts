import { AuthenticateUseCase } from '../authenticate'
import { KnexUsersRepository } from '@/repositories/knex/knex-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
