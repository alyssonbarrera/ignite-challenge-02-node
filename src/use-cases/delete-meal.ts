import { AppError } from './errors/AppError'
import { MealsRepository } from '@/repositories/meals-repository'

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(id: string) {
    const mealExists = await this.mealsRepository.findById(id)

    if (!mealExists) {
      throw new AppError('Meal not found', 404)
    }

    const meal = await this.mealsRepository.delete(id)

    return {
      meal,
    }
  }
}
