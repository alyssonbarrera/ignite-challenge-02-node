import { knex } from '@/database/knex'
import { Meal } from '@/entities/Meal'
import { CreateMealDTO } from '@/dtos/create-meal-dto'
import { UpdateMealDTO } from '@/dtos/update-meal-dto'
import { MealsRepository } from '../meals-repository'

export class KnexMealsRepository implements MealsRepository {
  async create(data: CreateMealDTO): Promise<Meal> {
    const [meal] = await knex('meals').insert(data).returning('*')

    return meal
  }

  async findByUserId(user_id: string): Promise<Meal[] | null> {
    const meals = await knex('meals')
      .where({ user_id })
      .join('users', 'users.id', '=', 'meals.user_id')
      .select('meals.*', 'users.name as user_name')

    return meals
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = await knex('meals')
      .where({ id })
      .first()
      .join('users', 'users.id', '=', 'meals.user_id')
      .select('meals.*', 'users.name as user_name')

    return meal
  }

  async update(id: string, data: UpdateMealDTO): Promise<Meal> {
    const [meal] = await knex('meals').where({ id }).update(data).returning('*')

    return meal
  }

  async delete(id: string): Promise<void> {
    await knex('meals').where({ id }).delete()
  }
}
