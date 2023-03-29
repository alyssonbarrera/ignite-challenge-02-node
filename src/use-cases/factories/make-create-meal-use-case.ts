import { CreateMealUseCase } from '../create-meal'
import { KnexMealsRepository } from '@/repositories/knex/knex-meals-repository'

export function makeCreateMealUseCase() {
  const mealsRepository = new KnexMealsRepository()
  const useCase = new CreateMealUseCase(mealsRepository)

  return useCase
}
