import Avatar from "@atoms/Avatar"
import Badge from "@atoms/Badge"
import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import NavLink from "@atoms/NavLink"
import Search from "@atoms/Search"
import { ToggleAsideContext } from "@contexts/ToggleAsideProvider/ToggleAside.context"
import { ComponentProps, useContext } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "fixed z-10 w-full h-16 py-4 pr-4 flex items-center bg-white shadow"
})
type HeaderProps = ComponentProps<"header"> & VariantProps<typeof variants> & {}

export default function Header({ className, ...rest }: HeaderProps) {
  const { setIsVisible } = useContext(ToggleAsideContext)
  className = variants({ className })

  return (
    <header className={className} {...rest}>
      <div className="h-full w-60 pl-4">
        <NavLink to={"/"} aria-label="ir para início">
          <img
            className="h-full"
            src="https://gambolthemes.net/html-items/cursus-new-demo/images/logo.svg"
            alt="Logotipo"
          />
        </NavLink>
      </div>

      <Search
        className="w-80 hidden md:flex"
        placeholder="Search for Tuts Videos, Tutors, Tests and more.."
      />

      <nav className="ml-auto">
        <ul className="flex items-center gap-4">
          <li className="sm:hidden">
            <Button
              className="px-2 py-0 text-neutral-500 hover:text-gray-800 focus:text-gray-800  hover:bg-gray-100 focus:bg-gray-100"
              onClick={setIsVisible}
            >
              <FontAwesomeIcon icon="fa-solid fa-bars" />
            </Button>
          </li>
          <li>
            <Button className="relative px-2 py-0 text-neutral-500 hover:text-gray-800 focus:text-gray-800 outline-none">
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
              <Badge className="absolute right-0 -top-[3px]">1</Badge>
            </Button>
          </li>
          <li>
            <Button className="relative px-2 py-0 text-neutral-500 hover:text-gray-800 focus:text-gray-800 outline-none">
              <FontAwesomeIcon icon="fa-solid fa-bell" />
              <Badge className="absolute right-0 -top-[3px]">3</Badge>
            </Button>
          </li>
          <li>
            <Button className="p-0">
              <Avatar
                className="border border-white shadow-md overflow-hidden"
                src="https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-10.jpg"
                name="Joabson Firmo da Silva"
              />
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
