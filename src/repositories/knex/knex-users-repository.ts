import { knex } from '@/database/knex'
import { UsersRepository } from '../users-repository'
import { CreateUserDTO } from '@/dtos/create-user-dto'

export class KnexUsersRepository implements UsersRepository {
  async create(data: CreateUserDTO) {
    const [user] = await knex('users').insert(data).returning('*')

    return user
  }

  async findByEmail(email: string) {
    const user = await knex('users').where({ email }).first()

    return user
  }

  async findById(id: string) {
    const user = await knex('users').where({ id }).first()

    return user
  }
}
