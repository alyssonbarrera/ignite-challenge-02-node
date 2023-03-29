import { MealsRepository } from '@/repositories/meals-repository'
import { AppError } from './errors/AppError'

export class FindMealByIdUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(id: string) {
    const meal = await this.mealsRepository.findById(id)

    if (!meal) {
      throw new AppError('Meal not found', 404)
    }

    return {
      meal,
    }
  }
}
