import { FindMealByIdUseCase } from '../find-meal-by-id'
import { KnexMealsRepository } from '@/repositories/knex/knex-meals-repository'

export function makeFindMealByIdUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new FindMealByIdUseCase(mealsRepository)

  return useCase
}
