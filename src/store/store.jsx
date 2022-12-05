import create from "zustand"

import constants from "../util/sorterconstants"

const generateRandomNumbers = (count, minimum, maximum) => {
  const numbers = []
  for (let id = 1; id <= count; id++) {
    numbers.push({
      id,
      value: minimum + Math.floor(Math.random() * (maximum - minimum + 1)),
      pivot: false,
      current: false,
      sorted: false,
    })
  }
  return numbers
}

const useStore = create((set, get) => ({
  isPlaying: false,
  color: constants.color.default,
  count: constants.count.default,
  minimum: constants.minimum.default,
  maximum: constants.maximum.default,
  algorithm: constants.algorithm.default,
  numbers: generateRandomNumbers(
    constants.count.default,
    constants.minimum.default,
    constants.maximum.default
  ),
  setColor: color => set({ color }),
  setCount: count => {
    set({ count })
    get().regenerateRandomNumbers()
  },
  setMinimum: minimum => {
    const { maximum, regenerateRandomNumbers } = get()
    set({ minimum, maximum: Math.max(maximum, minimum) })
    regenerateRandomNumbers()
  },
  setMaximum: maximum => {
    const { minimum, regenerateRandomNumbers } = get()
    if (maximum <= minimum) {
      return
    }
    set({ maximum })
    regenerateRandomNumbers()
  },
  setAlgorithm: algorithm => set({ algorithm }),
  regenerateRandomNumbers: () =>
    set({
      numbers: generateRandomNumbers(get().count, get().minimum, get().maximum),
    }),
  percentile: number => {
    const { minimum, maximum } = get()
    return 1 + 100 * ((number - minimum) / (maximum - minimum + 1))
  },
  play: () => {
    set({ isPlaying: true })
    const { algorithm, numbers, count } = get()
    const sorter = constants.algorithm.available[algorithm](numbers)
    const intervalId = setInterval(() => {
      const sorted = sorter.next()
      if (!sorted.done) {
        return set({ numbers: sorted.value })
      }
      set({ numbers: sorted.value, isPlaying: false })
      clearInterval(intervalId)
    }, Math.floor(1000 / count))
  },
}))

export const useColor = () => useStore(store => store.color)
export const useSetColor = () => useStore(store => store.setColor)

export const useCount = () => useStore(store => store.count)
export const useSetCount = () => useStore(store => store.setCount)

export const useMinimum = () => useStore(store => store.minimum)
export const useSetMinimum = () => useStore(store => store.setMinimum)

export const useMaximum = () => useStore(store => store.maximum)
export const useSetMaximum = () => useStore(store => store.setMaximum)

export const useAlgorithm = () => useStore(store => store.algorithm)
export const useSetAlgorithm = () => useStore(store => store.setAlgorithm)

export const useNumbers = () => useStore(store => store.numbers)
export const useRegenerateRandomNumbers = () =>
  useStore(store => store.regenerateRandomNumbers)
export const usePercentile = () => useStore(store => store.percentile)

export const useIsPlaying = () => useStore(store => store.isPlaying)
export const usePlay = () => useStore(store => store.play)
