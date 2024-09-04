import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Input from "@atoms/Input"
import NavLink from "@atoms/NavLink"
import Shimmer from "@atoms/Shimmer"
import { DEFAULT_PAGINATION } from "@constants/default-pagination"
import FirebasePagination from "@molecules/FirebasePagination"
import FirebasePaginationShimmer from "@molecules/FirebasePaginationShimmer"
import PaginationShimmer from "@molecules/PaginationShimmer"
import TableShimmer from "@molecules/TableShimmer"
import Dialog from "@organisms/Dialog"
import Table from "@organisms/Table"
import { lessonService } from "@services/lesson"
import { useAlertStore } from "@store/alert"
import { usePrompt } from "@store/prompt"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"

const { getLessons, createLesson, deleteLesson } = lessonService

export default function Lessons() {
  const { courseId } = useParams()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Partial<Lesson>>({ mode: "onTouched" })
  const [lessonModal, setLessonModal] = useState<boolean>(false)

  const [pagination, setPagination] =
    useState<FirebasePaginationType>(DEFAULT_PAGINATION)

  const { pageLimit, lastVisible, pageStart } = pagination

  const { setConfig } = usePrompt()
  const { addAlert } = useAlertStore()

  // Query para obter as lições
  const lessonsQuery = useQuery(
    ["lessons", courseId],
    async (): Promise<Lesson[] | undefined> => {
      if (courseId) {
        try {
          const { lessons, ...rest } = await getLessons(
            courseId,
            pageLimit,
            lastVisible
          )

          setPagination((prev) => ({
            ...prev,
            lastVisible: rest.pagination.lastVisible,
            total: rest.pagination.total
          }))

          if (lessonsQuery.data) {
            return [...lessonsQuery.data, ...lessons]
          }

          return lessons
        } catch {
          addAlert(
            "Erro ao carregar os módulos. Tente novamente mais tarde.",
            "error"
          )
        }
      }
    },
    { refetchOnWindowFocus: false, keepPreviousData: true }
  )

  // Mutation para deletar uma lição
  const deleteLessonMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteLesson(courseId!, id)
    },
    onSuccess: () => {
      lessonsQuery.refetch()
      addAlert("Módulo deletado com sucesso", "success")
    },
    onError: () => {
      addAlert("Erro ao deletar o módulo. Tente novamente mais tarde.", "error")
    }
  })

  // Mutation para criar uma lição
  const createLessonMutation = useMutation({
    mutationFn: (data: Partial<Lesson>) => {
      return createLesson(courseId!, data)
    },
    onSuccess: () => {
      setLessonModal(false)
      reset()
      lessonsQuery.refetch()

      addAlert("Módulo criado com sucesso!", "success")
    },
    onError: () => {
      addAlert("Erro ao criar o módulo. Tente novamente mais tarde.", "error")
    }
  })

  // Função de envio do formulário
  const submitForm = (data: Partial<Lesson>) => {
    createLessonMutation.mutate(data)
  }

  const isLoading =
    lessonsQuery.isLoading ||
    createLessonMutation.isLoading ||
    deleteLessonMutation.isLoading
  const { isFetching, data, refetch } = lessonsQuery

  return (
    <div className="pt-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-neutral-700">
          <FontAwesomeIcon icon="fa-solid fa-list" className="text-md w-6" />{" "}
          Módulos
        </h1>

        <NavLink
          to={`/admin/course-manager/${courseId}`}
          className="flex items-center gap-1 text-neutral-600 hover:text-neutral-700 hover:no-underline transition duration-200"
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-left" />
          voltar
        </NavLink>
      </div>

      <div className="flex flex-col bg-white rounded-md mt-10 p-4 border border-neutral-200">
        {lessonsQuery.isLoading ? (
          <>
            <Shimmer className="self-end h-[36px] w-[112px]" />
            <TableShimmer />
            <PaginationShimmer />
          </>
        ) : (
          <>
            <Button
              color="danger"
              className="self-end"
              onClick={() => setLessonModal(true)}
            >
              Criar módulo
            </Button>
            {lessonsQuery.data?.length === 0 ? (
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
                        Duração
                      </Table.THead.TR.TH>
                      <Table.THead.TR.TH className="text-center" colSpan={2}>
                        Ações
                      </Table.THead.TR.TH>
                    </Table.THead.TR>
                  </Table.THead>
                  <Table.TBody>
                    {lessonsQuery.data
                      ?.slice(pageStart, pageStart! + pageLimit)
                      .map(({ id, title, duration }, index) => (
                        <Table.TBody.TR key={id}>
                          <Table.TBody.TR.TD className="text-left pl-2">
                            {index + 1}
                          </Table.TBody.TR.TD>
                          <Table.TBody.TR.TD className="text-left" main>
                            {title}
                          </Table.TBody.TR.TD>
                          <Table.TBody.TR.TD className="text-center">
                            {duration || "--"}
                          </Table.TBody.TR.TD>
                          <Table.TBody.TR.TD className="text-center w-10">
                            <NavLink
                              to={`/admin/course-manager/${courseId}/lessons/${id}`}
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
                                    deleteLessonMutation.mutate(id)
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
                      ))}
                  </Table.TBody>
                </Table>
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
                      setLabel(`${start} - ${end} de ${total} módulos`)
                    }}
                  />
                )}
              </>
            )}
          </>
        )}

        <Dialog
          open={lessonModal}
          onClose={() => {
            setLessonModal(false)
            reset()
          }}
          title="Criar módulo"
        >
          <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
            <div className="mb-4">
              <label
                className="text-sm text-neutral-700 font-medium mb-1.5 block"
                htmlFor="title"
              >
                Título*
              </label>
              <Input
                id="title"
                placeholder="Digite o título do módulo"
                className="h-9"
                {...register("title", { required: "O título é obrigatório" })}
              />
              {errors.title && (
                <span className="text-xs text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>

            <Button
              color="danger"
              type="submit"
              disabled={!isValid}
              isLoading={createLessonMutation.isLoading}
            >
              Salvar
            </Button>
          </form>
        </Dialog>
      </div>
    </div>
  )
}
