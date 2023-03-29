export interface Meal {
  id: string
  name: string
  description: string
  date: string
  time: string
  within_the_diet: 1 | 0 // 1 = true, 0 = false
  user_id: string
  created_at: Date
}
