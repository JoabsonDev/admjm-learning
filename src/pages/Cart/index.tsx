import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import NavLink from "@atoms/NavLink"
import CartCardShimmer from "@molecules/CartCardShimmer"
import CartCardTotalShimmer from "@molecules/CartCardTotalShimmer"
import CartCard from "@organisms/CartCard"
import CartCardTotal from "@organisms/CartCardTotal"
import { cartService } from "@services/cart"
import { useAlertStore } from "@store/alert"
import useAuthStore from "@store/auth"
import useCartStore from "@store/cart"
import { useMutation, useQuery } from "react-query"

const { getCartCourses, removeItemFromCart } = cartService
export default function Cart() {
  const { user } = useAuthStore()
  const { addAlert } = useAlertStore()
  const { removeItem } = useCartStore()

  const { data, refetch, isLoading } = useQuery(
    ["cart-courses"],
    async () => {
      console.log(user?.uid)

      try {
        if (user?.uid) {
          const courses = await getCartCourses(user.uid)
          return courses
        }
        return []
      } catch {
        addAlert(
          "Erro ao listar os cursos do carrinho. Tente novamente mais tarde.",
          "error"
        )
        return []
      }
    },
    { refetchOnWindowFocus: false }
  )

  const removeCartMutation = useMutation({
    mutationFn: async (courseId: string) => {
      if (user?.uid) {
        await removeItemFromCart(user.uid, courseId)
        return courseId
      }
      throw new Error("User ID is undefined")
    },
    onSuccess: (courseId) => {
      removeItem(courseId)
      refetch()
      addAlert("Curso removido do carrinho com sucesso!", "success")
      console.log("Curso removido do carrinho com sucesso!")
    },
    onError: (error) => {
      console.error("Erro ao remover curso do carrinho:", error)
    }
  })

  return (
    <div className="pt-8 px-4 mb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-neutral-700">
          <FontAwesomeIcon
            icon="fa-solid fa-cart-shopping"
            className="text-md w-6"
          />{" "}
          Carrinho
        </h1>

        <NavLink
          to={"/"}
          className="flex items-center gap-1 text-neutral-600 hover:text-neutral-700 hover:no-underline transition duration-200"
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-left" />
          voltar
        </NavLink>
      </div>

      <div className="flex gap-4 mt-10 flex-col lg:flex-row">
        <div className="flex flex-col gap-4 flex-1 md:overflow-y-auto md:max-h-[600px] pretty-scroll">
          {isLoading ? (
            <CartCardShimmer />
          ) : (
            data?.map((data) => (
              <CartCard
                key={data.id}
                data={data}
                onRemove={() => removeCartMutation.mutate(data.id)}
              />
            ))
          )}
        </div>
        {isLoading ? <CartCardTotalShimmer /> : <CartCardTotal />}
      </div>
    </div>
  )
}
