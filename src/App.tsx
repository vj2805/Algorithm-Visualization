import { AppShell, MantineProvider } from "@mantine/core"
import { BrowserRouter } from "react-router-dom"
import { Header } from "./components/Header"
import { Main } from "./components/Main"

const App = () => {
  return (
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
      >
        <AppShell
          padding="md"
          header={<Header />}
          sx={{
            height: "100vh",
          }}
        >
          <Main />
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App
