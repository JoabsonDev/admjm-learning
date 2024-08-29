import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { ComponentProps, forwardRef } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "text-sm py-2 px-4 rounded transition duration-200 disabled:bg-neutral-300 disabled:text-white disabled:cursor-not-allowed",
  variants: {
    color: {
      default: "bg-transparent",
      // primary: "bg-blue-500 text-white hover:bg-blue-600",
      // secondary: "bg-green-500 text-white hover:bg-green-600",
      info: "bg-blue-600 text-white hover:bg-gray-800",
      danger: "bg-red-500 text-white hover:bg-gray-800"
      // dark: "bg-gray-800 text-white hover:bg-gray-900"
    },
    isLoading: {
      true: "select-none pointer-events-none"
    }
  }
})
type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof variants> & {
    isLoading?: boolean
  }

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, color = "default", children, isLoading, ...rest }: ButtonProps,
  ref
) {
  className = variants({ color, className, isLoading })

  return (
    <button className={className} {...rest} ref={ref}>
      {isLoading ? (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-notch"
          className="animate-spin text-sm"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  )
})
