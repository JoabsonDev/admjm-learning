import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Hr from "@atoms/Hr"
import NavLink from "@atoms/NavLink"
import { ToggleAsideContext } from "@contexts/ToggleAsideProvider/ToggleAside.context"
import { ComponentProps, useContext } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "fixed flex flex-col z-10 w-60 bg-white top-16 bottom-0 pb-4 transition-all duration-300",
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

  return (
    <aside className={className} {...rest}>
      <nav className="h-full pb-4">
        <ul className="flex flex-col h-full">
          <li>
            <NavLink
              to={"/"}
              className="min-h-11 w-full flex items-center px-4 gap-3 text-neutral-800 hover:no-underline hover:bg-red-200 hover:text-red-500 active:bg-red-200 active:text-red-500"
            >
              <FontAwesomeIcon icon="fa-solid fa-house text-lg w-6" />
              <span className="flex-1 text-sm font-medium">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/meus-cursos"}
              className="min-h-11 w-full flex items-center px-4 gap-3 text-neutral-800 hover:no-underline hover:bg-red-200 hover:text-red-500 active:bg-red-200 active:text-red-500"
            >
              <FontAwesomeIcon icon="fa-solid fa-photo-film text-sm w-6" />
              <span className="flex-1 text-sm font-medium">Meus cursos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/certificados"}
              className="min-h-11 w-full flex items-center px-4 gap-3 text-neutral-800 hover:no-underline hover:bg-red-200 hover:text-red-500 active:bg-red-200 active:text-red-500"
            >
              <FontAwesomeIcon icon="fa-solid fa-graduation-cap text-md w-6" />
              <span className="flex-1 text-sm font-medium">Certificados</span>
            </NavLink>
          </li>

          <Hr />

          <li>
            <NavLink
              to={"/settings"}
              className="min-h-11 w-full flex items-center px-4 gap-3 text-neutral-800 hover:no-underline hover:bg-red-200 hover:text-red-500 active:bg-red-200 active:text-red-500"
            >
              <FontAwesomeIcon icon="fa-solid fa-gear w-6" />
              <span className="flex-1 text-sm font-medium">Settings</span>
            </NavLink>
          </li>
          <li className="mt-auto">
            <NavLink
              to={"/settings"}
              className="min-h-11 w-full flex items-center px-4 gap-3 text-neutral-800 hover:no-underline hover:bg-red-200 hover:text-red-500 active:bg-red-200 active:text-red-500"
            >
              <FontAwesomeIcon icon="fa-solid fa-power-off text-lg w-6" />
              <span className="flex-1 text-sm font-medium">Sair</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <span className="text-xs flex items-center px-4">
        © 2024 <strong className="ml-1">Cursus</strong>. All Rights Reserved.
      </span>
    </aside>
  )
}
