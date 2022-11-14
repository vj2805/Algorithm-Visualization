import { ChangeEventHandler, MouseEventHandler, useState } from "react"
import { Button } from "@mui/material"

function App() {
  const [todos, setTodos] = useState(["one", "two", "three"])
  const [input, setInput] = useState(" ")

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInput(e.target.value)
  }
  const addTodos: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    setTodos([...todos, input])
    setInput(" ")
  }
  return (
    <div className="App">
      <h1>HEllOWolRD</h1>
      <form>
        <input
          value={input}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={addTodos}
        >
          ADDTODO
        </Button>
      </form>
      <ul>
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
