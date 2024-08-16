import { NavLinkProps, NavLink as RouterDomNavLink } from "react-router-dom"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "hover:underline transition duration-200",
  variants: {
    color: {
      // primary: "text-blue-500 text-white hover:text-blue-600",
      // secondary: "text-green-500 text-white hover:text-green-600",
      // info: "text-teal-500 text-white hover:text-teal-600",
      danger: "text-red-500 hover:text-gray-800"
      // dark: "text-gray-800 text-white hover:text-gray-900"
    }
  }
})
type LinkProps = NavLinkProps & VariantProps<typeof variants> & {}

export default function NavLink({
  className = "",
  color = "danger",
  ...rest
}: LinkProps) {
  className = variants({ color, className: className as string })

  return <RouterDomNavLink className={className} {...rest} />
}
