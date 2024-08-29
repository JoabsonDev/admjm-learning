import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"
import TH from "./TH"

const variants = tv({ base: "border-b border-neutral-200" })
type TRProps = ComponentProps<"tr"> & VariantProps<typeof variants> & {}

export default function TR({ className, ...rest }: TRProps) {
  className = variants({ className })

  return <tr className={className} {...rest} />
}

TR.TH = TH
