import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Rate from "@atoms/Rate"
import CourseContentAccordion from "@organisms/CourseContentAccordion"
import { cartService } from "@services/cart"
import { courseService } from "@services/course"
import { useAlertStore } from "@store/alert"
import useAuthStore from "@store/auth"
import useCartStore from "@store/cart"
import { useCourseStore } from "@store/course"
import { useEffect } from "react"
import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"

const { getCourse } = courseService
const { addItemToCart, removeItemFromCart } = cartService

export default function CourseDetails() {
  const { courseId } = useParams()

  const { setCourse, course } = useCourseStore()
  const { addItem, removeItem, items } = useCartStore()
  const { user } = useAuthStore()
  const { addAlert } = useAlertStore()

  const { isLoading } = useQuery(
    ["course", courseId],
    async () => {
      if (courseId) {
        const course = await getCourse(courseId)
        if (course) setCourse(course)
      }
    },
    { refetchOnWindowFocus: false }
  )

  const addCartMutation = useMutation({
    mutationFn: async (courseId: string) => {
      if (user?.uid) {
        return addItemToCart(user.uid, courseId)
      }
      throw new Error("User ID is undefined")
    },
    onSuccess: () => {
      addItem(courseId!)
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
      removeItem(courseId!)
      addAlert("Curso removido do carrinho com sucesso!", "success")
      console.log("Curso removido do carrinho com sucesso!")
    },
    onError: (error) => {
      console.error("Erro ao remover curso do carrinho:", error)
    }
  })

  const handleCartClick = () => {
    if (items.includes(courseId!)) {
      removeCartMutation.mutate(courseId!)
    } else {
      addCartMutation.mutate(courseId!)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="mb-10">
      <div className="bg-neutral-800 text-white p-4 flex flex-col md:flex-row gap-4 h-auto xl:h-[232px]">
        <div className="p-2.5 bg-white rounded-lg flex items-center justify-center w-full min-w-52 md:max-w-[340px] flex-1">
          {course?.thumbnail ? (
            <img
              className="rounded-[4px]"
              src={course?.thumbnail?.url}
              alt={`Imagem do curso ${course?.title || ""}`}
            />
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-image"
              className="text-neutral-400"
            />
          )}
        </div>

        <div className="h-full flex flex-col">
          <h1 className="font-semibold text-2xl mb-4">{course?.title}</h1>

          <p className="text-sm mb-5 line-clamp-3">{course?.description}</p>

          <Rate
            size={(course?.rate || 0) as RatingSize}
            className="text-yellow-500"
          />

          <div className="mt-4 xl:mt-auto flex items-center gap-4">
            <Button
              color="danger"
              className="border border-transparent hover:bg-red-600"
              onClick={handleCartClick}
            >
              {items.includes(courseId!)
                ? "Remover do carrinho"
                : "Adicionar ao carrinho"}
            </Button>
            <Button className="border border-white hover:bg-neutral-700">
              Comprar agora
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <h2 className="mb-5 text-lg font-medium text-neutral-700">
          Conteúdo do curso
        </h2>
        {!isLoading && <CourseContentAccordion />}
      </div>
    </div>
  )
}
