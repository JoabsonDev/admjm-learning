import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({ base: "border-neutral-300 w-full" })
type HeaderProps = ComponentProps<"header"> & VariantProps<typeof variants> & {}

export default function Header({ className, ...rest }: HeaderProps) {
  className = variants({ className })

  return <header className={className} {...rest} />
}
