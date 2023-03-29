import { FindMealByUserIdUseCase } from '../find-meal-by-user-id'
import { KnexMealsRepository } from '@/repositories/knex/knex-meals-repository'

export function makeFindMealByUserIdUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new FindMealByUserIdUseCase(mealsRepository)

  return useCase
}
