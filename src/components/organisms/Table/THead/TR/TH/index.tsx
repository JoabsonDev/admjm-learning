import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({ base: "text-neutral-700 font-medium pb-2" })
type THProps = ComponentProps<"th"> & VariantProps<typeof variants> & {}

export default function TH({ className, scope = "col", ...rest }: THProps) {
  className = variants({ className })

  return <th className={className} {...rest} scope={scope} />
}
