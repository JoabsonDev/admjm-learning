import React, { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "border border-neutral-300 has-[:focus-visible]:border-neutral-500 rounded overflow-hidden px-4 py-1 flex items-center gap-1 transition duration-200"
})
type InputConfig = {
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

type InputTypes =
  | "button"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "range"
  | "reset"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"

type InputProps = Omit<ComponentProps<"input">, "type"> & {
  type?: InputTypes
  config?: InputConfig
} & VariantProps<typeof variants>

export default function Input({
  className,
  config,
  type = "text",
  ...rest
}: InputProps) {
  className = variants({ className })
  const { icon, iconPosition = "left" } = config || {}

  return (
    <div className={className}>
      {icon && iconPosition === "left" && icon}
      <input
        className="border-none outline-none bg-transparent w-full text-sm text-neutral-600"
        type={type}
        {...rest}
      />
      {icon && iconPosition === "right" && icon}
    </div>
  )
}
