import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Rate from "@atoms/Rate"
import CourseContentAccordion from "@organisms/CourseContentAccordion"
import { courseService } from "@services/course"
import { useCourse } from "@store/course"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

export default function CourseDetails() {
  const { courseId } = useParams()

  const { getCourse } = courseService
  const { setCourse, course } = useCourse(({ setCourse, course }) => ({
    setCourse,
    course
  }))
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
            >
              Adicionar ao carrinho
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
