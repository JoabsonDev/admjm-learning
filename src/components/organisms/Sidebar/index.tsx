import { ToggleAsideContext } from "@contexts/ToggleAsideProvider/ToggleAside.context"
import { ComponentProps, useContext } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "fixed z-10 w-60 bg-white top-16 bottom-0 transition-all duration-300",
  variants: {
    isVisible: {
      true: "left-0",
      false: "-left-60"
    }
  }
})
type SidebarProps = ComponentProps<"aside"> & VariantProps<typeof variants> & {}

export default function Sidebar({ className, ...rest }: SidebarProps) {
  const { isVisible } = useContext(ToggleAsideContext)
  className = variants({ isVisible, className })

  return <aside className={className} {...rest} />
}
