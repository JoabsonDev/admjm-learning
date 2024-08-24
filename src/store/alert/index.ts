import { create } from "zustand"

export type AlertStore = {
  alerts: Alert[]
  addAlert: (message: string, type: "success" | "error") => void
  removeAlert: (id: number) => void
}

export const useAlert = create<AlertStore>((set) => {
  const addAlert = (message: string, type: "success" | "error") => {
    const id = Date.now()
    set((state) => ({
      alerts: [...state.alerts, { id, message, type }]
    }))

    // Auto-dismiss alert after 5 seconds
    setTimeout(() => {
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== id)
      }))
    }, 5000)
  }

  return {
    alerts: [],
    addAlert,
    removeAlert: (id) =>
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== id)
      }))
  }
})
