import { FindUserByIdUseCase } from '../find-user-by-id'
import { KnexUsersRepository } from '@/repositories/knex/knex-users-repository'

export function makeFindUserByIdUseCase() {
  const usersRepository = new KnexUsersRepository()
  const useCase = new FindUserByIdUseCase(usersRepository)

  return useCase
}
