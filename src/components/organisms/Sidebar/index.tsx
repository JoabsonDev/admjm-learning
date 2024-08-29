import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Hr from "@atoms/Hr"
import NavLink from "@atoms/NavLink"
import { useSidebarStore } from "@store/sidebar"
import { ComponentProps } from "react"
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
  const { isVisible } = useSidebarStore(({ isVisible }) => ({ isVisible }))
  className = variants({ isVisible, className })

  const menuItems: SidebarItem[] = [
    {
      title: "Home",
      icon: <FontAwesomeIcon icon="fa-solid fa-house text-lg w-6" />,
      to: "/"
    },
    {
      title: "Meus Cursos",
      icon: <FontAwesomeIcon icon="fa-solid fa-photo-film text-sm w-6" />,
      to: "/my-courses"
    },
    {
      title: "Certificados",
      icon: <FontAwesomeIcon icon="fa-solid fa-graduation-cap text-md w-6" />,
      to: "/certificates"
    },
    {
      title: "Admin",
      icon: <FontAwesomeIcon icon="fa-solid fa-clapperboard text-md w-6" />,
      to: "/admin"
    },
    {
      title: "divider",
      divider: true
    },
    {
      title: "Configurações",
      icon: <FontAwesomeIcon icon="fa-solid fa-gear w-6" />,
      to: "/settings"
    },
    {
      title: "Sair",
      icon: <FontAwesomeIcon icon="fa-solid fa-power-off text-lg w-6" />,
      callback: () => {
        console.log("Sair")
      }
    }
  ]

  return (
    <aside className={className} {...rest}>
      <nav className="h-full pb-4">
        <ul className="flex flex-col h-full">
          {menuItems.map((item) => {
            if (item.divider) return <Hr key={item.title} />

            if (item.callback)
              return (
                <li key={item.title} className="last:mt-auto">
                  <Button
                    onClick={item.callback}
                    className="min-h-11 w-full flex items-center px-4 gap-3 text-neutral-800 hover:no-underline hover:bg-red-200 hover:text-red-500 active:bg-red-200 active:text-red-500 rounded-none"
                  >
                    {item.icon}
                    <span className="flex-1 text-sm font-medium text-left">
                      {item.title}
                    </span>
                  </Button>
                </li>
              )

            return (
              <li key={item.title} className="last:mt-auto">
                <NavLink
                  to={item.to!}
                  className="min-h-11 w-full flex items-center px-4 gap-3 text-neutral-800 hover:no-underline hover:bg-red-200 hover:text-red-500 active:bg-red-200 active:text-red-500"
                >
                  {item.icon}
                  <span className="flex-1 text-sm font-medium text-left">
                    {item.title}
                  </span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <span className="text-xs flex items-center px-4">
        © 2024 <strong className="ml-1">Cursus</strong>. All Rights Reserved.
      </span>
    </aside>
  )
}
