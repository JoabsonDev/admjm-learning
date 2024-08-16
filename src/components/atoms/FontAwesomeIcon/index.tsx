import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  variants: {
    size: {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl"
    }
  }
})
type FontAwesomeIconProps = ComponentProps<"i"> &
  VariantProps<typeof variants> & {
    icon: string
  }

export default function FontAwesomeIcon({
  icon,
  size = "sm",
  className,
  ...rest
}: FontAwesomeIconProps) {
  className = variants({ size, className: twMerge(icon, className) })
  return <i className={className} aria-hidden={true} {...rest}></i>
}
