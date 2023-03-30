export function dateAndTimeToTimestamp(date: string, time: string) {
  const [day, month, year] = date.split('/')
  const [hour, minute] = time.split(':')

  return new Date(
    Number(day),
    Number(month) - 1,
    Number(year),
    Number(hour),
    Number(minute),
  ).getTime()
}
