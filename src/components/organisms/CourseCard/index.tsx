import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import NavLink from "@atoms/NavLink"
import Rate from "@atoms/Rate"
import { formateCurrency } from "@helpers/formate-currency"
import { cartService } from "@services/cart"
import { useAlertStore } from "@store/alert"
import useAuthStore from "@store/auth"
import useCartStore from "@store/cart"
import { ComponentProps } from "react"
import { useMutation } from "react-query"
import { tv, VariantProps } from "tailwind-variants"

const { addItemToCart, removeItemFromCart } = cartService

const variants = tv({
  base: "p-2.5 bg-white rounded-sm border border-neutral-200 max-w-sm min-h-[400px] flex flex-col"
})
type CourseCardProps = ComponentProps<"div"> &
  VariantProps<typeof variants> & {
    data: Course
  }

export default function CourseCard({
  className,
  data,
  ...rest
}: CourseCardProps) {
  className = variants({ className })
  const {
    id,
    title,
    description,
    thumbnail,
    rate = 0,
    price,
    duration,
    alreadyPurchased
  } = data

  const { addAlert } = useAlertStore()
  const { addItem, removeItem, items } = useCartStore()
  const { user } = useAuthStore()

  const addCartMutation = useMutation({
    mutationFn: async (courseId: string) => {
      if (user?.uid) {
        return addItemToCart(user.uid, courseId)
      }
      throw new Error("User ID is undefined")
    },
    onSuccess: () => {
      addItem(id)
      addAlert("Curso adicionado ao carrinho com sucesso!", "success")
      console.log("Curso adicionado ao carrinho com sucesso!")
    },
    onError: (error) => {
      console.error("Erro ao adicionar curso ao carrinho:", error)
    }
  })

  const removeCartMutation = useMutation({
    mutationFn: async (courseId: string) => {
      if (user?.uid) {
        return removeItemFromCart(user.uid, courseId)
      }
      throw new Error("User ID is undefined")
    },
    onSuccess: () => {
      removeItem(id)
      addAlert("Curso removido do carrinho com sucesso!", "success")
      console.log("Curso removido do carrinho com sucesso!")
    },
    onError: (error) => {
      console.error("Erro ao remover curso do carrinho:", error)
    }
  })

  const handleCartClick = () => {
    if (items.includes(id)) {
      removeCartMutation.mutate(id)
    } else {
      addCartMutation.mutate(id)
    }
  }

  return (
    <div className={className} {...rest}>
      <NavLink
        to={!alreadyPurchased ? `/course/${id}/details` : `/course/${id}`}
        className="relative hover:no-underline"
        aria-label={title}
      >
        {thumbnail?.url ? (
          <img
            className="w-full aspect-video object-cover"
            src={thumbnail.url}
            alt={`Imagem do curso ${title}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FontAwesomeIcon
              icon="fa-regular fa-image"
              className="w-full aspect-video object-cover flex items-center justify-center text-[50px] text-neutral-500"
            />
          </div>
        )}

        <div className="group absolute inset-0 bg-gradient-to-b from-transparent to-neutral-700/35">
          <FontAwesomeIcon
            icon="fa-solid fa-play"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full grid place-items-center bg-neutral-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          {duration && (
            <span className="absolute right-2.5 bottom-2.5 py-1 px-2.5 rounded bg-neutral-900/70 text-white text-xs font-medium">
              {duration}
            </span>
          )}
        </div>
      </NavLink>

      <div className="px-1 py-2.5 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <Rate size={rate} />

          <div className="relative group">
            <Button className="p-1" aria-label="Mais opções">
              <FontAwesomeIcon
                icon="fa-solid fa-ellipsis-vertical"
                className="text-lg text-neutral-500"
              />
            </Button>

            <ul className="absolute -right-1 top-7 w-40 bg-white shadow-md rounded overflow-hidden border border-gray-100 hidden group-hover:block">
              <li>
                <Button className="w-full text-left flex items-center gap-1.5 rounded-none text-neutral-500 hover:bg-red-100 focus:bg-red-100 hover:text-neutral-700 text-sm">
                  <FontAwesomeIcon
                    icon="fa-solid fa-share-nodes"
                    className="text-base"
                  />
                  Share
                </Button>
              </li>
              <li>
                <Button className="w-full text-left flex items-center gap-1.5 rounded-none text-neutral-500 hover:bg-red-100 focus:bg-red-100 hover:text-neutral-700 text-sm">
                  <FontAwesomeIcon
                    icon="fa-regular fa-heart"
                    className="text-base"
                  />
                  Save
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <NavLink
          to={"/"}
          className="text-base font-semibold block mb-2 hover:no-underline"
        >
          {title}
        </NavLink>

        {description && (
          <p className="text-xs text-neutral-500 line-clamp-3">{description}</p>
        )}

        {price && (
          <div className="flex items-center justify-end mt-auto">
            {!alreadyPurchased && (
              <Button
                className="p-2 text-neutral-700 w-10 group relative"
                aria-label={
                  items.includes(id)
                    ? "Remover do carrinho"
                    : "Adicionar ao carrinho"
                }
                onClick={handleCartClick}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-cart-shopping"
                  className="text-base group-hover:translate-x-1 transition-all duration-200"
                />
                <FontAwesomeIcon
                  icon={
                    items.includes(id)
                      ? "fa-solid fa-minus"
                      : "fa-solid fa-plus"
                  }
                  className={`flex items-center justify-center absolute right-[4px] top-[4px] h-3 aspect-square rounded-full text-white text-[8px] group-hover:translate-x-1 transition-all duration-200 ${
                    items.includes(id) ? "bg-red-500" : "bg-green-500"
                  }`}
                />
              </Button>
            )}

            {price && (
              <span className="text-neutral-700 text-base font-medium">
                {formateCurrency({ value: price })}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
