import { ReactNode, useEffect, useState } from "react"
import { BREAKPOINTS } from "../../emuns/breakpoints.enum"
import { ToggleAsideContext } from "./ToggleAside.context"

export function ToggleAsideProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState<boolean>(true)

  function setIsVisible() {
    setVisible((prev) => !prev)
  }

  useEffect(() => {
    const checkBreakpoint = () => {
      if (window.innerWidth >= BREAKPOINTS.SM && !visible) setVisible(true)
      else if (window.innerWidth < BREAKPOINTS.SM && visible) setVisible(false)
    }

    window.addEventListener("resize", checkBreakpoint)

    return () => {
      window.removeEventListener("resize", checkBreakpoint)
    }
  }, [visible])

  return (
    <ToggleAsideContext.Provider value={{ isVisible: visible, setIsVisible }}>
      {children}
    </ToggleAsideContext.Provider>
  )
}
