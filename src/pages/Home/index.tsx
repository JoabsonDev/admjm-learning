import { DEFAULT_PAGINATION } from "@constants/default-pagination"
import { useDebounce } from "@hooks/debounce"
import CourseCardShimmer from "@molecules/CourseCardShimmer"
import FilterShimmer from "@molecules/FilterShimmer"
import FirebasePagination from "@molecules/FirebasePagination"
import FirebasePaginationShimmer from "@molecules/FirebasePaginationShimmer"
import CourseCard from "@organisms/CourseCard"
import Filter from "@organisms/Filter"
import { courseService } from "@services/course"
import { useState } from "react"
import { useQuery } from "react-query"

const { getCourses } = courseService

export default function Home() {
  const [pagination, setPagination] =
    useState<FirebasePaginationType>(DEFAULT_PAGINATION)

  const [filter, setFilter] = useState<FilterConfig>({
    order: null,
    value: ""
  })
  const [lastFilter, setLastFilter] = useState<FilterConfig>({
    order: null,
    value: ""
  })
  const [filteredData, setFilteredData] = useState<Course[]>([])

  const debouncedQuery = useDebounce(filter.value, 300)

  const { pageLimit, lastVisible, pageStart } = pagination

  const { data, isLoading, isFetching, refetch } = useQuery<Course[]>(
    ["courses", debouncedQuery, filter.order],
    async (): Promise<Course[]> => {
      const { courses, ...rest } = await getCourses(
        filter.value,
        filter.order,
        pageLimit,
        lastVisible
      )

      if (
        (!debouncedQuery && !filter.order) ||
        JSON.stringify(lastFilter) !== JSON.stringify(filter)
      )
        setFilteredData([])

      if (debouncedQuery || filter.order) {
        if (JSON.stringify(lastFilter) !== JSON.stringify(filter)) {
          setLastFilter(filter)
          setFilteredData(courses)
        } else {
          setFilteredData((prev) => [...prev, ...courses])
        }
      }

      setPagination((prev) => ({
        ...prev,
        lastVisible: rest.pagination.lastVisible,
        total: rest.pagination.total
      }))

      if (data) {
        return [...data, ...courses]
      }

      return courses
    },
    { refetchOnWindowFocus: false, keepPreviousData: true }
  )

  return (
    <div className="pt-8 px-4">
      {/* <div className="mb-12">
        <h2 className="mb-5 text-lg font-medium text-neutral-700">
          Continuar estudando
        </h2>

        <CourseCard
          className="mx-auto md:m-0 min-w-72 max-w-full md:max-w-[50%]"
          data={continueCourses}
        />
      </div> */}

      <div className="mb-12">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
          <h2 className="text-lg font-medium text-neutral-700">
            Cursos em destaque
          </h2>
          {isLoading ? (
            <FilterShimmer className="flex-1" />
          ) : (
            <Filter config={filter} onFilter={setFilter} className="flex-1" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading || isFetching
            ? Array.from({ length: 4 }).map((_, index) => (
                <CourseCardShimmer key={index} className="w-full max-w-full" />
              ))
            : (filteredData.length > 0 ? filteredData : data)
                ?.slice(pageStart, pageStart! + pageLimit)
                .map((course) => (
                  <CourseCard
                    className="w-full max-w-full"
                    key={course.id}
                    data={course}
                  />
                ))}
        </div>

        {isLoading || isFetching ? (
          <FirebasePaginationShimmer className="mt-10" />
        ) : (
          <FirebasePagination
            className="mt-10"
            pagination={pagination}
            onRefetch={refetch}
            onPaginationChange={setPagination}
            loadedDataLength={data?.length}
            setPaginationLabel={({ start, end, total }, setLabel) => {
              setLabel(`${start} - ${end} de ${total} cursos`)
            }}
          />
        )}
      </div>
    </div>
  )
}
