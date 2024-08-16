import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({})
type BadgeProps = ComponentProps<"span"> & VariantProps<typeof variants> & {}

export default function Badge({ className, ...rest }: BadgeProps) {
  className = variants({ className })

  return <span className={className} {...rest} />
}
