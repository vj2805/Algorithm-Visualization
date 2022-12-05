import { Grid, Node } from "../util/getInitialGrid"

export const dijkstra = (grid: Grid, startNode: Node, finishNode: Node) => {
  const visitedNodesInOrder = []
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)
  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()!
    if (closestNode.isWall) continue
    if (closestNode.distance === Infinity) return visitedNodesInOrder
    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)
    if (closestNode === finishNode) return visitedNodesInOrder
    updateUnvisitedNeighbors(closestNode, grid)
  }
}
export const getNodesInShortestPathOrder = (finishNode: Node) => {
  const nodesInShortestPathOrder = []
  let currentNode: Node | null = finishNode
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode)
    currentNode = currentNode.previousNode
  }
  return nodesInShortestPathOrder
}

const sortNodesByDistance = (unvisitedNodes: Node[]) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

const updateUnvisitedNeighbors = (node: Node, grid: Grid) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbour of unvisitedNeighbors) {
    neighbour.distance = node.distance + 1
    neighbour.previousNode = node
  }
}

const getUnvisitedNeighbors = (node: Node, grid: Grid) => {
  const neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  return neighbors.filter(neighbor => !neighbor.isVisited)
}

const getAllNodes = (grid: Grid) => {
  const nodes = []
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  }
  return nodes
}
