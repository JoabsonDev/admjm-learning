import Avatar from "@atoms/Avatar"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Shimmer from "@atoms/Shimmer"
import { DEFAULT_PAGINATION } from "@constants/default-pagination"
import { formateCurrency } from "@helpers/formate-currency"
import FirebasePagination from "@molecules/FirebasePagination"
import FirebasePaginationShimmer from "@molecules/FirebasePaginationShimmer"
import PaginationShimmer from "@molecules/PaginationShimmer"
import TableShimmer from "@molecules/TableShimmer"
import Table from "@organisms/Table"
import { courseService } from "@services/course"
import { useAlertStore } from "@store/alert"
import { usePrompt } from "@store/prompt"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { NavLink } from "react-router-dom"

const { getCourses, deleteCourse } = courseService

// TODO: desabilitar buttons para evitar multiplas requisições
export default function Admin() {
  const { setConfig } = usePrompt()
  const { addAlert } = useAlertStore()

  const [pagination, setPagination] =
    useState<FirebasePaginationType>(DEFAULT_PAGINATION)

  const { pageLimit, lastVisible, pageStart } = pagination
  const getCoursesQuery = useQuery<Course[]>(
    ["courses"],
    async (): Promise<Course[]> => {
      const { courses, ...rest } = await getCourses(
        "",
        null,
        pageLimit,
        lastVisible
      )

      setPagination((prev) => ({
        ...prev,
        lastVisible: rest.pagination.lastVisible,
        total: rest.pagination.total
      }))

      if (getCoursesQuery.data) {
        return [...getCoursesQuery.data, ...courses]
      }

      return courses
    },
    { refetchOnWindowFocus: false, keepPreviousData: true }
  )

  const deleteCourseMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteCourse(id)
    },
    onSuccess: () => {
      getCoursesQuery.refetch()
      addAlert("Curso deletado com sucesso", "success")
    },
    onError: () => {
      addAlert("Erro ao deletar o curso. Tente novamente mais tarde.", "error")
    }
  })

  return (
    <div className="py-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-neutral-700">
          <FontAwesomeIcon
            icon="fa-solid fa-clapperboard"
            className="text-md w-6"
          />{" "}
          Admin
        </h1>

        <NavLink
          to={"/"}
          className="flex items-center gap-1 text-neutral-600 hover:text-neutral-700 transition duration-200"
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-left" />
          voltar
        </NavLink>
      </div>

      <div className="flex flex-col bg-white rounded-md mt-10 p-4 border border-neutral-200">
        {getCoursesQuery.isLoading ? (
          <>
            <Shimmer className="self-end h-[36px] w-[134px]" />
            <TableShimmer />
            <PaginationShimmer />
          </>
        ) : (
          <>
            <NavLink
              to={"/admin/course-manager"}
              className="text-sm py-2 px-4 bg-red-500 text-white hover:bg-gray-800 rounded transition duration-200 self-end"
            >
              Criar novo curso
            </NavLink>
            {getCoursesQuery.data?.length === 0 ? (
              <p className="text-center text-neutral-600 text-sm mt-8">
                <FontAwesomeIcon icon="fa-solid fa-box-open" className="mr-2" />
                Ainda não há nenhum dado para listar!
              </p>
            ) : (
              <>
                <Table className="mt-8">
                  <Table.THead>
                    <Table.THead.TR>
                      <Table.THead.TR.TH className="text-left pl-2">
                        Nº
                      </Table.THead.TR.TH>
                      <Table.THead.TR.TH className="text-left">
                        Título
                      </Table.THead.TR.TH>
                      <Table.THead.TR.TH className="text-center">
                        Preço
                      </Table.THead.TR.TH>
                      <Table.THead.TR.TH className="text-center">
                        Duração
                      </Table.THead.TR.TH>
                      <Table.THead.TR.TH className="text-center" colSpan={2}>
                        Ações
                      </Table.THead.TR.TH>
                    </Table.THead.TR>
                  </Table.THead>
                  <Table.TBody>
                    {getCoursesQuery.data
                      ?.slice(pageStart, pageStart! + pageLimit)
                      .map(
                        ({ id, title, price, duration, thumbnail }, index) => (
                          <Table.TBody.TR key={id}>
                            <Table.TBody.TR.TD className="text-left pl-2">
                              {index + 1}
                            </Table.TBody.TR.TD>
                            <Table.TBody.TR.TD
                              className="flex items-center gap-2 text-left"
                              main
                            >
                              <Avatar
                                src={thumbnail?.url ?? thumbnail?.url}
                                name={title}
                              />
                              {title}
                            </Table.TBody.TR.TD>

                            <Table.TBody.TR.TD className="text-center">
                              {formateCurrency({ value: price! })}
                            </Table.TBody.TR.TD>
                            <Table.TBody.TR.TD className="text-center">
                              {duration || "--"}
                            </Table.TBody.TR.TD>
                            <Table.TBody.TR.TD className="text-center w-10">
                              <NavLink
                                to={`/admin/course-manager/${id}`}
                                className="block hover:-rotate-12 hover:-translate-y-1 transition-all duration-100"
                              >
                                <FontAwesomeIcon
                                  icon="fa-solid fa-pen-to-square"
                                  className="text-base"
                                />
                              </NavLink>
                            </Table.TBody.TR.TD>
                            <Table.TBody.TR.TD className="text-center w-10">
                              <button
                                className="text-red-500 hover:-rotate-12 hover:-translate-y-1 transition-all duration-200"
                                onClick={() => {
                                  setConfig({
                                    show: true,
                                    callback: () =>
                                      deleteCourseMutation.mutate(id)
                                  })
                                }}
                              >
                                <FontAwesomeIcon
                                  icon="fa-solid fa-trash-can"
                                  className="text-base"
                                />
                              </button>
                            </Table.TBody.TR.TD>
                          </Table.TBody.TR>
                        )
                      )}
                  </Table.TBody>
                </Table>

                {getCoursesQuery.isLoading || getCoursesQuery.isFetching ? (
                  <FirebasePaginationShimmer className="mt-10" />
                ) : (
                  <FirebasePagination
                    className="mt-10"
                    pagination={pagination}
                    onRefetch={getCoursesQuery.refetch}
                    onPaginationChange={setPagination}
                    loadedDataLength={getCoursesQuery.data?.length}
                    setPaginationLabel={({ start, end, total }, setLabel) => {
                      setLabel(`${start} - ${end} de ${total} cursos`)
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
