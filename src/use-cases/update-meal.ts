import { UpdateMealDTO } from '@/dtos/update-meal-dto'
import { MealsRepository } from '@/repositories/meals-repository'
import { AppError } from './errors/AppError'

export class UpdateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(id: string, data: UpdateMealDTO) {
    const meal = await this.mealsRepository.update(id, data)

    if (!meal) {
      throw new AppError('Meal not found', 404)
    }

    return {
      meal,
    }
  }
}
