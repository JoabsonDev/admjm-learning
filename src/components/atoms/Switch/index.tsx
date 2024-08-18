import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex items-center gap-1 relative"
})

const toggleVariants = tv({
  base: "bg-gray-200 h-6 w-12 rounded-full transition duration-200 before:content-[''] before:block before:bg-white before:rounded-full before:shadow-md before:transition before:duration-200 peer-[:checked]:bg-red-500 peer-focus-visible:outline-ring",
  variants: {
    size: {
      sm: "w-8 h-4 before:w-4 before:h-4 peer-[:checked]:before:translate-x-[16px]",
      md: "w-12 h-6 before:w-[21px] before:h-[21px] before:translate-y-[1px] before:translate-x-[2px] peer-[:checked]:before:translate-x-[25px]"
    }
  }
})

type SwitchProps = Omit<ComponentProps<"input">, "type" | "size"> &
  VariantProps<typeof variants> &
  VariantProps<typeof toggleVariants> & {
    label?: string
    labelPosition?: "left" | "right"
  }

export default function Switch({
  className,
  label,
  labelPosition = "right",
  size = "md",
  ...rest
}: SwitchProps) {
  className = variants({ className })

  return (
    <label className={className}>
      {label && labelPosition === "left" && (
        <span className="text-sm font-medium text-neutral-500">{label}</span>
      )}
      <input type="checkbox" className="peer absolute opacity-0" {...rest} />
      <div aria-hidden={true} className={toggleVariants({ size })}></div>
      {label && labelPosition === "right" && (
        <span className="text-sm font-medium text-neutral-500">{label}</span>
      )}
    </label>
  )
}
