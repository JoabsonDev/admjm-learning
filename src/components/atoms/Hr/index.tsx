import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({ base: "border-neutral-300 w-full" })
type HrProps = ComponentProps<"hr"> & VariantProps<typeof variants> & {}

export default function Hr({ className, ...rest }: HrProps) {
  className = variants({ className })

  return <hr className={className} {...rest} />
}
