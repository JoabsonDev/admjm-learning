import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({ base: "py-2 text-neutral-600" })
type TDProps = ComponentProps<"td"> &
  VariantProps<typeof variants> & {
    main?: boolean
  }

export default function TD({ className, scope, main, ...rest }: TDProps) {
  className = variants({ className })

  return <td className={className} scope={main ? "row" : scope} {...rest} />
}
