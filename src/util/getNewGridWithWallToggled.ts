import { Grid } from "./getInitialGrid"

const getNewGridWithWallToggled = (grid: Grid, row: number, col: number) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]
  const newNode = {
    ...node,
    isWall: !node.isWall,
  }
  newGrid[row][col] = newNode
  console.log("WALL UP HERE")
  return newGrid
}

export default getNewGridWithWallToggled
