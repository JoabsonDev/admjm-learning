import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const labelVariants = tv({
  base: "flex items-center gap-1 text-sm text-neutral-600"
})

const inputVariants = tv({
  variants: {
    accentColor: {
      primary: "accent-blue-500",
      secondary: "accent-green-500",
      info: "accent-teal-500",
      danger: "accent-red-500",
      dark: "accent-gray-800"
    },
    size: {
      default: "scale-100",
      sm: "scale-[1.230769231]",
      md: "scale[1.538461538]",
      lg: "scale-[1.846153846]"
    }
  }
})
type AccentColors = "primary" | "secondary" | "info" | "danger" | "dark"

type ToggleTypes = "checkbox" | "radio"

type ToggleProps = Omit<ComponentProps<"input">, "type"> &
  VariantProps<typeof labelVariants> & {
    type: ToggleTypes
    label?: string
    labelPosition?: "left" | "right"
    accentColor?: AccentColors | `#${string}`
  }

export default function Toggle({
  className,
  type,
  label,
  labelPosition = "right",
  accentColor = "primary",
  ...rest
}: ToggleProps) {
  className = labelVariants({ className })

  let inputClassName = ""
  if (accentColor) {
    if (accentColor.startsWith("#")) {
      inputClassName = `accent-[${accentColor}]`
    } else {
      inputClassName = inputVariants({
        accentColor: accentColor as AccentColors
      })
    }
  }

  return (
    <label className={className}>
      {label && labelPosition === "left" && (
        <span className="-mb-[2px]">{label}</span>
      )}
      <input type={type} className={inputClassName} {...rest} />
      {label && labelPosition === "right" && (
        <span className="-mb-[2px]">{label}</span>
      )}
    </label>
  )
}
