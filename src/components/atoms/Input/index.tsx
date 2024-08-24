import React, { ComponentProps, forwardRef } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "border border-neutral-300 has-[:focus-visible]:border-neutral-500 rounded overflow-hidden px-4 py-1 flex items-center gap-1 has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-neutral-100 has-[:disabled]:text-neutral-500 transition duration-200"
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

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, config, type = "text", ...rest }: InputProps,
  ref
) {
  className = variants({ className })
  const { icon, iconPosition = "left" } = config || {}

  return (
    <div className={className}>
      {icon && iconPosition === "left" && icon}
      <input
        ref={ref}
        className="border-none outline-none bg-transparent w-full text-sm text-neutral-600 disabled:cursor-not-allowed disabled:text-neutral-500"
        type={type}
        {...rest}
      />
      {icon && iconPosition === "right" && icon}
    </div>
  )
})
