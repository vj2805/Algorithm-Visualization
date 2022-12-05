export function swap(numbers, i, j) {
  const temp = numbers[i]
  numbers[i] = numbers[j]
  numbers[j] = temp
}
