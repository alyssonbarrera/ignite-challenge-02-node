import { Meal } from '@/entities/Meal'
import { AppError } from './errors/AppError'
import { MealsRepository } from '@/repositories/meals-repository'
import { dateAndTimeToTimestamp } from '@/utils/date-and-time-to-timestamp'
import { calculateTheBestSequenceOfMealsWithinTheDiet } from '@/utils/calculate-the-beast-sequence-of-meals-within-the-diet'

export class GetMetricsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(id: string) {
    const meals = await this.mealsRepository.findByUserId(id)

    if (!meals) {
      throw new AppError('Meal not found', 404)
    }

    const totalMeals = meals.length
    const mealsWithinTheDiet = meals.filter(
      (meal: Meal) => meal.within_the_diet === 1,
    )

    const mealsSortedByDateAndTime = meals.sort((a, b) => {
      const aTimestamp = dateAndTimeToTimestamp(a.date, a.time)
      const bTimestamp = dateAndTimeToTimestamp(b.date, b.time)

      return aTimestamp - bTimestamp
    })

    const bestSequence = calculateTheBestSequenceOfMealsWithinTheDiet(
      mealsSortedByDateAndTime,
    )

    return {
      totalMeals,
      mealsWithinTheDiet: mealsWithinTheDiet.length,
      mealsOutsideTheDiet: totalMeals - mealsWithinTheDiet.length,
      bestMealSequence: bestSequence,
    }
  }
}
