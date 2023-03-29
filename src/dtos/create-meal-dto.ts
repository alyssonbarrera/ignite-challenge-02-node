export interface CreateMealDTO {
  id?: string
  name: string
  description: string
  date: string
  time: string
  within_the_diet: boolean
  user_id: string
}
