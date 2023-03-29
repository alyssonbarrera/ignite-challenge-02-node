import { Meal } from '@/entities/Meal'
import { CreateMealDTO } from '@/dtos/create-meal-dto'
import { UpdateMealDTO } from '@/dtos/update-meal-dto'

export interface MealsRepository {
  create(data: CreateMealDTO): Promise<Meal>
  findByUserId(user_id: string): Promise<Meal[] | null>
  findById(id: string): Promise<Meal | null>
  update(id: string, data: UpdateMealDTO): Promise<Meal>
  delete(id: string): Promise<void>
}
