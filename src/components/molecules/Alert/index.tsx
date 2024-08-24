import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const variants = tv({
  base: "relative flex items-center justify-between gap-2 rounded-md px-4 py-2 rounded-lg text-white shadow-lg transition-transform duration-300 ease-in-out",
  variants: {
    type: {
      success: "bg-green-500",
      error: "bg-red-500",
      isVisible: {
        true: "transform translate-x-0",
        false: "transform translate-x-full opacity-0"
      }
    }
  }
})
type AlertProps = ComponentProps<"div"> & Alert

export default function Alert({
  className,
  message,
  onClose,
  type,
  ...rest
}: AlertProps) {
  className = variants({
    className,
    type
  })
  return (
    <div className={className} {...rest}>
      <span className="text-sm">{message}</span>
      <button onClick={onClose}>
        <FontAwesomeIcon icon="fa-solid fa-xmark" className="text-base" />
      </button>
    </div>
  )
}
