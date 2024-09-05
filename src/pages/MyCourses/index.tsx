import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { DEFAULT_PAGINATION } from "@constants/default-pagination"
import CourseCardShimmer from "@molecules/CourseCardShimmer"
import FirebasePagination from "@molecules/FirebasePagination"
import FirebasePaginationShimmer from "@molecules/FirebasePaginationShimmer"
import CourseCard from "@organisms/CourseCard"
import { courseService } from "@services/course"
import useAuthStore from "@store/auth"
import { useState } from "react"
import { useQuery } from "react-query"
import { NavLink } from "react-router-dom"

const { getCoursesFromUser } = courseService

export default function MyCourses() {
  const { user } = useAuthStore()

  const { data, isLoading, isFetching, refetch } = useQuery<Course[]>(
    ["my-courses"],
    async (): Promise<Course[]> => {
      if (!user?.uid) return []

      const { courses, ...rest } = await getCoursesFromUser(user?.uid)

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

  const [pagination, setPagination] =
    useState<FirebasePaginationType>(DEFAULT_PAGINATION)

  const { pageLimit, pageStart } = pagination

  return (
    <div className="pt-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center text-lg font-medium text-neutral-700">
          <FontAwesomeIcon
            icon="fa-solid fa-layer-group"
            className="text-md w-6"
          />{" "}
          Meus cursos
        </h1>

        <NavLink
          to={`/`}
          className="flex items-center gap-1 text-neutral-600 hover:text-neutral-700 transition duration-200"
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-left" />
          voltar
        </NavLink>
      </div>

      <div className="my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading || isFetching
            ? Array.from({ length: 4 }).map((_, index) => (
                <CourseCardShimmer key={index} className="w-full max-w-full" />
              ))
            : data
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
