import { randomUUID } from 'crypto'
import { CreateMealDTO } from '@/dtos/create-meal-dto'
import { MealsRepository } from '@/repositories/meals-repository'

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
