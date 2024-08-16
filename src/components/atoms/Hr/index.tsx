import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({ base: "border-neutral-300 w-full" })
type HrProps = Omit<ComponentProps<"hr">, "type"> &
  VariantProps<typeof variants> & {}

export default function Hr({ className, ...rest }: HrProps) {
  className = variants({ className })

  return <hr className={className} {...rest} />
}
