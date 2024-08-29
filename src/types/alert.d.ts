type Alert = {
  id?: number
  message: string
  type: "success" | "error" //| "warning" | "info"
  onClose?: () => void
}
