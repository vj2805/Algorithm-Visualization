import { swap } from "./swap"

export function* generateExhangeSorter(numbers) {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const pivot = numbers[i]
      pivot.pivot = true
      const current = numbers[j]
      current.current = true
      yield [...numbers]
      if (pivot.value > current.value) {
        swap(numbers, i, j)
        yield [...numbers]
      }
      pivot.pivot = false
      current.current = false
    }
    numbers[i].sorted = true
    yield [...numbers]
  }
  numbers[numbers.length - 1].sorted = true
  return [...numbers]
}
