import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({ base: "border-neutral-300 w-full" })
type HeaderProps = Omit<ComponentProps<"header">, "type"> &
  VariantProps<typeof variants> & {}

export default function Header({ className, ...rest }: HeaderProps) {
  className = variants({ className })

  return <header className={className} {...rest} />
}
