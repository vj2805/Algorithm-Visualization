import { swap } from "./swap"

export function* generateSelectionSorter(numbers) {
  for (let i = 0; i < numbers.length - 1; i++) {
    let min_idx = i
    for (let j = i; j < numbers.length; j++) {
      const pivot = numbers[min_idx]
      pivot.pivot = true
      const current = numbers[j]
      current.current = true
      yield [...numbers]
      if (pivot.value > current.value) {
        min_idx = j
      }
      pivot.pivot = false
      current.current = false
    }
    if (min_idx != i) {
      swap(numbers, min_idx, i)
    }
    numbers[i].sorted = true
    yield [...numbers]
  }
  numbers[numbers.length - 1].sorted = true
  return [...numbers]
}
