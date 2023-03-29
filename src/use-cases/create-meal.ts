import { CreateMealDTO } from '@/dtos/create-meal-dto'
import { MealsRepository } from '@/repositories/meals-repository'
import { randomUUID } from 'crypto'

export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(data: CreateMealDTO) {
    const meal = await this.mealsRepository.create({
      id: randomUUID(),
      ...data,
    })

    return {
      meal,
    }
  }
}
