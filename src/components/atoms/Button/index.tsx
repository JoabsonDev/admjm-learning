import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "text-sm py-2 px-4 rounded transition duration-200",
  variants: {
    color: {
      // primary: "bg-blue-500 text-white hover:bg-blue-600",
      // secondary: "bg-green-500 text-white hover:bg-green-600",
      // info: "bg-teal-500 text-white hover:bg-teal-600",
      danger: "bg-red-500 text-white hover:bg-gray-800"
      // dark: "bg-gray-800 text-white hover:bg-gray-900"
    }
  }
})
type ButtonProps = Omit<ComponentProps<"button">, "type"> &
  VariantProps<typeof variants> & {}

export default function Button({
  className,
  color = "danger",
  ...rest
}: ButtonProps) {
  className = variants({ color, className })

  return <button className={className} {...rest} />
}
