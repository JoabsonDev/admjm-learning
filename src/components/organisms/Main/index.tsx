import { ToggleAsideContext } from "@contexts/ToggleAsideProvider/ToggleAside.context"
import { ComponentProps, useContext } from "react"
import { Outlet } from "react-router-dom"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "pt-24 pb-4 px-4 transition-all duration-300",
  variants: {
    hasAside: {
      true: "sm:ml-60"
    }
  }
})
type MainProps = ComponentProps<"main"> & VariantProps<typeof variants> & {}

export default function Main({ className, ...rest }: MainProps) {
  const { isVisible } = useContext(ToggleAsideContext)
  className = variants({ hasAside: isVisible, className })

  return (
    <main className={className} {...rest}>
      <Outlet />
    </main>
  )
}
