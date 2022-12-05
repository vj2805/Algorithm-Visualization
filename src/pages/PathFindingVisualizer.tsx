import { Box, createStyles } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { dijkstra, getNodesInShortestPathOrder } from "../algorithm/dijkstra"
import DisplayNode from "../components/Node"
import {
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  START_NODE_COL,
  START_NODE_ROW,
} from "../util/constants"
import getInitialGrid, { Grid, Node } from "../util/getInitialGrid"
import getNewGridWithWallToggled from "../util/getNewGridWithWallToggled"
import "./PathfindingVisualizer.css"

const useStyles = createStyles(() => ({
  grid: {
    margin: "auto",
    position: "absolute",
    right: "0px",
    width: "78%",
    height: "100%",
    border: "3px solid #323332",
    padding: "9px",
    maxHeight: "100%",
  },
}))

function PathfindingVisualizer() {
  const { classes } = useStyles()
  const gridRef = useRef<HTMLDivElement>(null)
  const [grid, setGrid] = useState<Grid>([])
  const [mouseIsPressed, setMouseIsPressed] = useState<boolean>(false)

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      const newGrid = getNewGridWithWallToggled(grid, row, col)
      setGrid(newGrid)
      setMouseIsPressed(true)
    },
    [grid]
  )

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (!mouseIsPressed) return
      const newGrid = getNewGridWithWallToggled(grid, row, col)
      setGrid(newGrid)
    },
    [mouseIsPressed, grid]
  )

  const handleMouseUp = useCallback(() => {
    setMouseIsPressed(false)
  }, [])

  const visualizeDijkstra = useCallback(() => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)!
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
  }, [grid])
  const resetGrid = useCallback(() => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)!
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
    reset(visitedNodesInOrder, nodesInShortestPathOrder)
    setGrid(
      getInitialGrid(
        Math.floor((gridRef.current?.clientHeight ?? 0) / 15),
        Math.floor((gridRef.current?.clientWidth ?? 0) / 15)
      )
    )
  }, [grid])

  useLayoutEffect(() => {
    setGrid(
      getInitialGrid(
        Math.floor((gridRef.current?.clientWidth ?? 0) / 15),
        Math.floor((gridRef.current?.clientHeight ?? 0) / 15)
      )
    )
  }, [gridRef.current?.clientHeight, gridRef.current?.clientWidth])
  console.log(grid?.length, grid?.[0]?.length)
  return (
    <div className="container">
      <div className="buttons">
        <button onClick={visualizeDijkstra}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={resetGrid}>reset</button>
      </div>
      <Box
        ref={gridRef}
        className={classes.grid}
        h="100%"
      >
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node
                return (
                  <DisplayNode
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                    row={row}
                  ></DisplayNode>
                )
              })}
            </div>
          )
        })}
      </Box>
    </div>
  )
}

const animateDijkstra = (
  visitedNodesInOrder: Node[],
  nodesInShortestpathOrder: Node[]
) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestpathOrder)
      }, 10 * i)
      return
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i]
      document.getElementById(`node-${node.row}-${node.col}`)!.className =
        "node node-visited"
      if (node.isStart) {
        setTimeout(() => {
          document.getElementById(
            `node-${node.row}-${node.col}`
          )!.className = `node node-start`
        }, 1)
      }
      if (node.isFinish) {
        setTimeout(() => {
          document.getElementById(
            `node-${node.row}-${node.col}`
          )!.className = `node node-finish`
        }, 1)
      }
    }, 10 * i)
  }
}
const reset = (
  visitedNodesInOrder: Node[],
  nodesInShortestpathOrder: Node[]
) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {}, 10 * i)
      return
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i]
      document.getElementById(
        `node-${node.row}-${node.col}`
      )!.className = `node reset`
      if (node.isStart) {
        setTimeout(() => {
          document.getElementById(
            `node-${node.row}-${node.col}`
          )!.className = `node node-start`
        }, 150)
      }
      if (node.isFinish) {
        setTimeout(() => {
          document.getElementById(
            `node-${node.row}-${node.col}`
          )!.className = `node node-finish`
        }, 1)
      }
    }, 10 * i)
  }
}

const animateShortestPath = (nodesInShortestPathOrder: Node[]) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i]
      document.getElementById(`node-${node.row}-${node.col}`)!.className =
        "node node-shortest-path"
      if (node.isStart) {
        setTimeout(() => {
          document.getElementById(
            `node-${node.row}-${node.col}`
          )!.className = `node node-start`
        }, 1)
      }
      if (node.isFinish) {
        setTimeout(() => {
          document.getElementById(
            `node-${node.row}-${node.col}`
          )!.className = `node node-finish`
        }, 1)
      }
    }, 50 * i)
  }
}

export default PathfindingVisualizer
