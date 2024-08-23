import { BREAKPOINTS } from "@enums/breakpoints.enum"
import { create } from "zustand"

export type SidebarStore = {
  isVisible: boolean
  setIsVisible: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => {
  const isResizing = { current: false }

  const checkBreakpoint = () => {
    if (isResizing.current) {
      set({ isVisible: window.innerWidth >= BREAKPOINTS.SM })
      isResizing.current = false
    }
  }

  const handleResize = () => {
    isResizing.current = true
    checkBreakpoint()
  }

  window.addEventListener("resize", handleResize)

  checkBreakpoint()

  return {
    isVisible: window.innerWidth >= BREAKPOINTS.SM,
    setIsVisible: () => set(({ isVisible }) => ({ isVisible: !isVisible }))
  }
})
