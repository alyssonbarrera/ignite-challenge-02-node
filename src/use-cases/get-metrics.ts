import { Meal } from '@/entities/Meal'
import { AppError } from './errors/AppError'
import { MealsRepository } from '@/repositories/meals-repository'

function bestMealSequence(meals: Meal[]) {
  let maxSequence = 0
  let currentSequence = 0

  for (let i = 0; i < meals.length; i++) {
    if (meals[i].within_the_diet === 1) {
      currentSequence++
    } else {
      maxSequence = Math.max(maxSequence, currentSequence)
      currentSequence = 0
    }
  }

  maxSequence = Math.max(maxSequence, currentSequence)

  return maxSequence
}

function dateAndTimeToTimestamp(date: string, time: string) {
  const [year, month, day] = date.split('-')
  const [hour, minute] = time.split(':')

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
  ).getTime()
}

export class GetMetricsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute(id: string) {
    const meals = await this.mealsRepository.findByUserId(id)

    if (!meals) {
      throw new AppError('Meal not found', 404)
    }

    const mealsSortedByDateAndTime = meals.sort((a, b) => {
      const aTimestamp = dateAndTimeToTimestamp(a.date, a.time)
      const bTimestamp = dateAndTimeToTimestamp(b.date, b.time)

      return aTimestamp - bTimestamp
    })

    const totalMeals = meals.length
    const mealsWithinTheDiet = meals.filter(
      (meal: Meal) => meal.within_the_diet === 1,
    )
    const bestSequence = bestMealSequence(mealsSortedByDateAndTime)

    return {
      totalMeals,
      mealsWithinTheDiet: mealsWithinTheDiet.length,
      mealsOutsideTheDiet: totalMeals - mealsWithinTheDiet.length,
      bestMealSequence: bestSequence,
    }
  }
}
