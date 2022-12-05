import {
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  START_NODE_COL,
  START_NODE_ROW,
} from "./constants"

const getInitialGrid = (rows: number, cols: number) => {
  const grid = []
  for (let row = 0; row < 20; row++) {
    const currentRow = []
    for (let col = 0; col < 67; col++) {
      currentRow.push(createNode(col, row))
    }
    grid.push(currentRow)
  }
  return grid
}

const createNode = (col: number, row: number) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  }
}

export type Node = {
  col: number
  row: number
  isStart: boolean
  isFinish: boolean
  distance: number
  isVisited: boolean
  isWall: boolean
  previousNode: Node | null
}

export type Grid = Node[][]

export default getInitialGrid
