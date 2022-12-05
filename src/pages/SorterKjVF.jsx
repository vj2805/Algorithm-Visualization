import classes from "./SorterKj.module.css"
import {
  useAlgorithm,
  useColor,
  useCount,
  useIsPlaying,
  useMaximum,
  useMinimum,
  useNumbers,
  usePercentile,
  usePlay,
  useRegenerateRandomNumbers,
  useSetAlgorithm,
  useSetColor,
  useSetCount,
  useSetMaximum,
  useSetMinimum,
} from "../store/store"
import constants from "../util/sorterconstants"

export const SorterKjVF = () => (
  <div className={classes.wrapper}>
    <header className={classes.selection}>
      <Color />
      <Count />
      <Range />
      <Algorithm />
      <Regenerate />
      <Play />
    </header>
    <main className={classes.display}>
      <Spikes />
    </main>
  </div>
)

const Color = () => {
  const color = useColor()
  const setColor = useSetColor()
  const isPlaying = useIsPlaying()
  const handleColorChange = event => {
    setColor(event.target.value)
  }
  return (
    <span className={classes.theme}>
      {constants.color.available.map(clr => (
        <input
          type="radio"
          name="theme"
          key={clr}
          value={clr}
          style={{ "--color": clr }}
          checked={color === clr}
          onChange={handleColorChange}
          disabled={isPlaying}
        />
      ))}
    </span>
  )
}

const Count = () => {
  const count = useCount()
  const setCount = useSetCount()
  const isPlaying = useIsPlaying()
  const handleCountChange = event => {
    setCount(event.target.valueAsNumber)
  }
  return (
    <span className={classes.count}>
      Count:
      <input
        type="number"
        name="count"
        min={10}
        max={45}
        value={count}
        onChange={handleCountChange}
        disabled={isPlaying}
      />
    </span>
  )
}

const Range = () => (
  <span className={classes.range}>
    Range:
    <Minimum />
    to
    <Maximum />
  </span>
)

const Minimum = () => {
  const minimum = useMinimum()
  const isPlaying = useIsPlaying()
  const setMinimum = useSetMinimum()
  const handleMinimumChange = event => {
    setMinimum(event.target.valueAsNumber)
  }
  return (
    <input
      type="number"
      name="min"
      min={1}
      max={100}
      value={minimum}
      onChange={handleMinimumChange}
      disabled={isPlaying}
    />
  )
}

const Maximum = () => {
  const maximum = useMaximum()
  const isPlaying = useIsPlaying()
  const setMaximum = useSetMaximum()
  const handleMaximumChange = event => {
    setMaximum(event.target.valueAsNumber)
  }
  return (
    <input
      type="number"
      name="max"
      min={1}
      max={100}
      value={maximum}
      onChange={handleMaximumChange}
      disabled={isPlaying}
    />
  )
}

const Algorithm = () => {
  const algorithm = useAlgorithm()
  const isPlaying = useIsPlaying()
  const setAlgorithm = useSetAlgorithm()
  const handleAlgorithmChange = event => {
    setAlgorithm(event.target.value)
  }
  return (
    <span className={classes.algorithm}>
      <select
        value={algorithm}
        onChange={handleAlgorithmChange}
        disabled={isPlaying}
      >
        {Object.keys(constants.algorithm.available).map(algo => (
          <option
            key={algo}
            value={algo}
          >
            {algo}
          </option>
        ))}
      </select>
    </span>
  )
}

const Regenerate = () => {
  const isPlaying = useIsPlaying()
  const generateRandomNumbers = useRegenerateRandomNumbers()
  return (
    <button
      onClick={generateRandomNumbers}
      disabled={isPlaying}
    >
      Regenerate
    </button>
  )
}

const Play = () => {
  const isPlaying = useIsPlaying()
  const play = usePlay()
  return (
    <button
      onClick={play}
      disabled={isPlaying}
    >
      Play
    </button>
  )
}

const Spikes = () => {
  const color = useColor()
  const numbers = useNumbers()
  const percentile = usePercentile()
  return (
    <>
      {numbers.map(num => (
        <span
          style={{
            "--color": num.pivot
              ? "darkslateblue"
              : num.current
              ? "darkred"
              : num.sorted
              ? "green"
              : color,
            "--height": percentile(num.value),
          }}
          className={classes.spike}
          key={num.id}
        ></span>
      ))}
    </>
  )
}
