import { Meal } from '@/entities/Meal'

export function calculateTheBestSequenceOfMealsWithinTheDiet(meals: Meal[]) {
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
