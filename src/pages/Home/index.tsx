import { createQueryParams } from "@helpers/create-query-params"
import { useDebounce } from "@hooks/debounce"
import Pagination from "@molecules/Pagination"
import CourseCard from "@organisms/CourseCard"
import Sort from "@organisms/Sort"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const continueCourses: CourseCard = {
    id: "1",
    title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
    // price: 25,
    image:
      "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-1.jpg",
    rating: 4.5,
    time: "25 hours"
  }

  const featuredCourses: CourseCard[] = [
    {
      id: "1",
      title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
      price: 25,
      image:
        "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-1.jpg",
      rating: 4.5,
      time: "25 hours",
      alreadyPurchased: true
    },
    {
      id: "2",
      title: "The Complete JavaScript Course 2020: Build Real Projects!",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
      price: 20,
      image:
        "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-2.jpg",
      rating: 3.5,
      time: "28 hours",
      alreadyPurchased: true
    },
    {
      id: "3",
      title: "Beginning C++ Programming - From Beginner to Beyond",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
      price: 24.5,
      image:
        "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-3.jpg",
      rating: 4,
      time: "12 hours",
      alreadyPurchased: true
    },
    {
      id: "4",
      title: "The Complete Digital Marketing Course - 12 Courses in 1",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
      price: 12,
      image:
        "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-4.jpg",
      rating: 2.5,
      time: "1 hour",
      alreadyPurchased: true
    }
  ]

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {featuredCourses.map((course) => (
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
        />
      </div>
    </div>
  )
}
