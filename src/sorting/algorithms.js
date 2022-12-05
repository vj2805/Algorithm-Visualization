import { generateExhangeSorter } from "./exhange"
import { generateSelectionSorter } from "./selection"

export const availableAlgorithms = {
  selection: generateSelectionSorter,
  exchange: generateExhangeSorter,
}
