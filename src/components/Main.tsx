import { Box } from "@mantine/core"
import { Route, Routes } from "react-router-dom"
import PathfindingVisualizer from "../pages/PathfindingVisualizer"
import { SorterKjVF } from "../pages/SorterKjVF.jsx"

export const Main = () => (
  <Box
    pos="relative"
    h="100%"
  >
    <Routes>
      <Route
        path="/"
        element={<SorterKjVF />}
      />
      <Route
        path="/path-finding-visualizer"
        element={<PathfindingVisualizer />}
      />
    </Routes>
  </Box>
)
