import { ComponentProps } from "react"
import { Outlet } from "react-router-dom"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({})
type MainProps = ComponentProps<"main"> & VariantProps<typeof variants> & {}

export default function Main({ className, ...rest }: MainProps) {
  className = variants({ className })
  return (
    <main className={className} {...rest}>
      <Outlet />
    </main>
  )
}
