import { ToggleAsideProvider } from "@contexts/ToggleAsideProvider/ToggleAside.provider"
import Router from "./routes"

export default function App() {
  return (
    <ToggleAsideProvider>
      <Router />
    </ToggleAsideProvider>
  )
}
