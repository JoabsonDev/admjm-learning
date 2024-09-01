import { createQueryParams } from "@helpers/create-query-params"
import { useDebounce } from "@hooks/debounce"
import Pagination from "@molecules/Pagination"
import CourseCard from "@organisms/CourseCard"
import Sort from "@organisms/Sort"
import { courseService } from "@services/course"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"

const { getCourses } = courseService

export default function Home() {
  // TODO: remover esses mocks ao integrar com firebase a lógica desses itens
  const continueCourses: Course = {
    id: "bTuVJqVVfoprKX7Tj221",
    title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
    // price: 25,
    thumbnail: {
      url: "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-1.jpg",
      ref: ""
    },
    rate: 4.5,
    duration: "25 hours",
    alreadyPurchased: true
  }

  const { data } = useQuery(["courses"], async () => {
    const courses = await getCourses()
    return courses
  })

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 15,
    total: 89
  })

  const [sort, setSort] = useState<SortConfig>({
    order: null,
    value: ""
  })

  const isMounted = useRef(false)

  const debouncedQuery = useDebounce(sort.value, 300)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    handleFilter()
  }, [debouncedQuery, sort.order])

  function handleFilter() {
    const params = {
      ...sort,
      value: debouncedQuery,
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize
    }

    console.log(`Buscando por:`, createQueryParams(params))
  }

  return (
    <div className="pt-8 px-4">
      <div className="mb-12">
        <h2 className="mb-5 text-lg font-medium text-neutral-700">
          Continuar estudando
        </h2>

        <CourseCard
          className="mx-auto md:m-0 min-w-72 max-w-full md:max-w-[50%]"
          data={continueCourses}
        />
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <h2 className="text-lg font-medium text-neutral-700">
            Cursos em destaque
          </h2>

          <Sort config={sort} onSort={setSort} className="flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data?.map((course) => (
            <CourseCard
              className="w-full max-w-full"
              key={course.id}
              data={course}
            />
          ))}
        </div>

        <Pagination
          className="mt-10"
          data={pagination}
          onPageChange={(page) =>
            setPagination({ ...pagination, currentPage: page })
          }
          setPaginationLabel={({ start, end, total }, setLabel) => {
            setLabel(`${start} - ${end} de ${total} cursos`)
          }}
        />
      </div>
    </div>
  )
}
