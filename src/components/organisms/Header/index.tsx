import Avatar from "@atoms/Avatar"
import Badge from "@atoms/Badge"
import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Hr from "@atoms/Hr"
import NavLink from "@atoms/NavLink"
import Search from "@atoms/Search"
import { isSafeArea } from "@helpers/is-safe-area"
import { authService } from "@services/auth"
import { cartService } from "@services/cart"
import { useAlertStore } from "@store/alert"
import useAuthStore from "@store/auth"
import useCartStore from "@store/cart"
import { useSidebarStore } from "@store/sidebar"
import { ComponentProps, useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { tv, VariantProps } from "tailwind-variants"

const { logout } = authService
const { getCart } = cartService

const variants = tv({
  base: "fixed z-10 w-full h-16 py-4 pr-4 flex items-center bg-white shadow"
})
type HeaderProps = ComponentProps<"header"> & VariantProps<typeof variants> & {}

export default function Header({ className, ...rest }: HeaderProps) {
  const { setIsVisible } = useSidebarStore(({ setIsVisible }) => ({
    setIsVisible
  }))
  className = variants({ className })

  const { addAlert } = useAlertStore()
  const { user, loading } = useAuthStore()
  const { items, addItem } = useCartStore()

  useQuery(
    ["cart", user?.uid],
    async () => {
      if (user?.uid) {
        const cart = await getCart(user?.uid)

        if (cart) {
          cart.forEach((item) => {
            addItem(item)
          })
        }
      }
    },
    { refetchOnWindowFocus: false }
  )

  const [showSubMenu, setShowSubMenu] = useState<boolean>(false)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const toggleSubMenu = ({ target }: MouseEvent) => {
      if (showSubMenu) {
        setShowSubMenu(
          isSafeArea(target as HTMLElement, menuRef.current as HTMLElement)
        )
        return
      }

      setShowSubMenu(
        isSafeArea(target as HTMLElement, buttonRef.current as HTMLElement)
      )
    }

    document.addEventListener("click", toggleSubMenu)

    return () => {
      document.removeEventListener("click", toggleSubMenu)
    }
  }, [showSubMenu])

  const signOut = async () => {
    await logout()
    addAlert("Você saiu da sua conta!", "success")
  }

  if (loading && !user) return null

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
        <ul className="flex items-center gap-2 sm:gap-4">
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
              {items.length > 0 && (
                <Badge className="absolute right-0 -top-[3px]">
                  {items.length}
                </Badge>
              )}
            </Button>
          </li>
          <li>
            <Button className="relative px-2 py-0 text-neutral-500 hover:text-gray-800 focus:text-gray-800 outline-none">
              <FontAwesomeIcon icon="fa-solid fa-bell" />
              <Badge className="absolute right-0 -top-[3px]">3</Badge>
            </Button>
          </li>
          <li>
            <Button
              ref={buttonRef}
              className="p-0 rounded-full"
              aria-expanded={showSubMenu}
            >
              <Avatar
                className="border border-white shadow-md overflow-hidden"
                src={user?.photoURL || undefined}
                name={user?.displayName || undefined}
              />
            </Button>

            {showSubMenu && (
              <ul
                ref={menuRef}
                className="absolute right-4 top-16 bg-white shadow-md rounded overflow-hidden border border-gray-100"
              >
                <div className="p-4 flex items-center gap-2.5">
                  <Avatar
                    size="md"
                    className="border border-white shadow-md overflow-hidden"
                    src={user?.photoURL || undefined}
                    name={user?.displayName || undefined}
                  />

                  <div>
                    <h6 className="text-sm font-medium">{user?.displayName}</h6>

                    <span className="text-neutral-500 text-xs">
                      {user?.email}
                    </span>
                  </div>
                </div>

                <Hr />

                <li className="p-1">
                  <NavLink
                    to={"/"}
                    className="text-left inline-block w-full text-sm py-2.5 px-4 text-gray-800 hover:bg-red-100 focus:bg-red-100 hover:no-underline"
                  >
                    Account
                  </NavLink>
                </li>
                <li className="p-1">
                  <button
                    className="text-left inline-block w-full text-sm py-2.5 px-4 text-gray-800 hover:bg-red-100 focus:bg-red-100 hover:no-underline"
                    onClick={signOut}
                  >
                    Sair
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}
