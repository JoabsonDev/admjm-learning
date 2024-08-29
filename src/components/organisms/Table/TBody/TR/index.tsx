import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"
import TD from "./TD"

const variants = tv({
  base: "border-b border-neutral-200 hover:bg-neutral-100 transition duration-100"
})
type TRProps = ComponentProps<"tr"> & VariantProps<typeof variants> & {}

export default function TR({ className, ...rest }: TRProps) {
  className = variants({ className })

  return <tr className={className} {...rest} />
}

TR.TD = TD
