import { Route, Routes } from "react-router-dom"
import { PathFindingVisualizer } from "../pages/PathFindingVisualizer"

export const Main = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<p>Sorting</p>}
      />
      <Route
        path="/path-finding-visualizer"
        element={<PathFindingVisualizer />}
      />
    </Routes>
  )
}
