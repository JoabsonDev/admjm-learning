import { createContext } from "react"

export type ToggleAsideContextType = {
  isVisible: boolean
  setIsVisible: () => void
}

export const ToggleAsideContext = createContext<ToggleAsideContextType>(null!)
