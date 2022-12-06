import { Box, Button, Group, Stack } from "@mantine/core"
import { useCallback, useState } from "react"
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

function PathfindingVisualizer() {
  const [grid, setGrid] = useState<Grid>(getInitialGrid)
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
    setGrid(getInitialGrid())
  }, [grid])

  return (
    <Group
      h="100%"
      sx={{ gap: 0 }}
    >
      <Stack
        mx="xs"
        py="xs"
        h="100%"
        justify="flex-start"
      >
        <Button onClick={visualizeDijkstra}>
          Visualize Dijkstra's Algorithm
        </Button>
        <Button onClick={resetGrid}>reset</Button>
      </Stack>
      <Stack
        mx="xs"
        h="100%"
        align="center"
        justify="center"
        sx={{ gap: 0, flexGrow: 1 }}
      >
        {grid.map((row, rowIdx) => {
          return (
            <Box key={rowIdx}>
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
            </Box>
          )
        })}
      </Stack>
    </Group>
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
