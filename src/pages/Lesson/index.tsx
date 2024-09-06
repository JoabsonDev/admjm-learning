import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Input from "@atoms/Input"
import Shimmer from "@atoms/Shimmer"
import YouTubeThumbnail from "@atoms/YouTubeThumbnail"
import { DEFAULT_PAGINATION } from "@constants/default-pagination"
import { getDurationYouTubeVideo } from "@helpers/get-duration-youtube-video"
import { getYouTubeVideoId } from "@helpers/get-youtube-video-id"
import { removeDuplicates } from "@helpers/merge-and-remove-duplicates"
import FirebasePagination from "@molecules/FirebasePagination"
import FirebasePaginationShimmer from "@molecules/FirebasePaginationShimmer"
import PaginationShimmer from "@molecules/PaginationShimmer"
import TableShimmer from "@molecules/TableShimmer"
import Dialog from "@organisms/Dialog"
import Table from "@organisms/Table"
import { lectureService } from "@services/lecture"
import { lessonService } from "@services/lesson"
import { useAlertStore } from "@store/alert"
import { usePrompt } from "@store/prompt"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { NavLink, useParams } from "react-router-dom"

const { getLesson, updateLesson } = lessonService
const { deleteLecture, createLecture, updateLecture, getLectures } =
  lectureService

export default function Lesson() {
  const [lectureModal, setLectureModal] = useState<boolean>(false)
  const [isEditingModuleTitle, setIsEditingModuleTitle] =
    useState<boolean>(false)

  const { courseId, lessonId } = useParams()
  const { setConfig } = usePrompt()
  const { addAlert } = useAlertStore()

  const lessonForm = useForm<Partial<Lesson>>({ mode: "onTouched" })
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger
  } = useForm<Partial<Lecture>>({ mode: "onTouched" })

  const lessonQuery = useQuery(
    ["lesson", courseId, lessonId],
    async () => {
      if (courseId && lessonId) {
        try {
          const lesson = await getLesson(courseId, lessonId)
          return lesson
        } catch {
          addAlert(
            "Erro ao carregar os módulos. Tente novamente mais tarde.",
            "error"
          )
        }
      }
    },
    { refetchOnWindowFocus: false }
  )

  const [pagination, setPagination] =
    useState<FirebasePaginationType>(DEFAULT_PAGINATION)

  const { pageLimit, lastVisible, pageStart } = pagination

  const lecturesQuery = useQuery(
    ["lectures", courseId, lessonId],
    async (): Promise<Lecture[] | undefined> => {
      if (courseId && lessonId) {
        try {
          const { lectures, ...rest } = await getLectures(
            courseId,
            lessonId,
            pageLimit,
            lastVisible
          )

          setPagination((prev) => ({
            ...prev,
            lastVisible: rest.pagination.lastVisible,
            total: rest.pagination.total
          }))

          if (lecturesQuery.data) {
            return removeDuplicates([...lecturesQuery.data, ...lectures], "id")
          }

          return lectures
        } catch {
          addAlert(
            "Erro ao carregar as aulas. Tente novamente mais tarde.",
            "error"
          )
        }
      }
    },
    { refetchOnWindowFocus: false, keepPreviousData: true }
  )

  const submitLessonForm = useMutation({
    mutationFn: async (data: Partial<Lesson>) => {
      if (courseId && lessonId) {
        await updateLesson(courseId, lessonId, data)
      }
    },
    onSuccess: () => {
      setIsEditingModuleTitle(false)
      lessonQuery.refetch()
      addAlert("Módulo atualizado com sucesso!", "success")
    },
    onError: () => {
      addAlert("Erro ao atualizar módulo", "error")
    }
  })

  const submitLectureForm = useMutation({
    mutationFn: async ({ id, ...rest }: Partial<Lecture>) => {
      if (courseId && lessonId) {
        if (id) {
          await updateLecture(courseId, lessonId, id, rest)
        } else {
          await createLecture(courseId, lessonId, rest)
        }
      }
    },
    onSuccess: () => {
      reset()
      setLectureModal(false)
      lessonQuery.refetch()
      addAlert("Aula salva com sucesso!", "success")
    },
    onError: () => {
      addAlert("Erro ao salvar aula", "error")
    }
  })

  const deleteLectureMutation = useMutation({
    mutationFn: async (id: string) => {
      if (courseId && lessonId) {
        await deleteLecture(courseId, lessonId, id)
      }
    },
    onSuccess: () => {
      addAlert("Aula deletada com sucesso!", "success")
      lessonQuery.refetch()
    },
    onError: () => {
      addAlert("Erro ao deletar aula", "error")
    }
  })

  const handleSubmitLesson = (data: Partial<Lesson>) => {
    submitLessonForm.mutate(data)
  }

  const handleSubmitLecture = (data: Partial<Lecture>) => {
    submitLectureForm.mutate(data)
  }

  const handleDeleteLecture = (id: string) => {
    deleteLectureMutation.mutate(id)
  }

  const isLoading =
    lessonQuery.isLoading ||
    submitLessonForm.isLoading ||
    lecturesQuery.isLoading
  const { isFetching, refetch, data } = lecturesQuery

  return (
    <div className="pt-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center text-lg font-medium text-neutral-700">
          <FontAwesomeIcon
            icon="fa-solid fa-layer-group"
            className="text-md w-6"
          />{" "}
          Módulo -
          {isEditingModuleTitle ? (
            <form
              className={`flex gap-2 ml-1 ${
                lessonForm.formState.errors.title
                  ? "items-start"
                  : "items-center"
              }`}
              onSubmit={lessonForm.handleSubmit(handleSubmitLesson)}
            >
              <div>
                <Input
                  id="title"
                  placeholder="Digite o título do curso"
                  className="h-9"
                  {...lessonForm.register("title", {
                    required: "O título é obrigatório"
                  })}
                />
                {lessonForm.formState.errors.title && (
                  <span className="text-xs text-red-500 block">
                    {lessonForm.formState.errors.title.message}
                  </span>
                )}
              </div>
              <Button
                color="danger"
                type="button"
                className="py-1.5 bg-neutral-400 text-white hover:bg-neutral-500 h-[36px]"
                onClick={() => {
                  lessonForm.reset()
                  setIsEditingModuleTitle(false)
                }}
              >
                Cancelar
              </Button>
              <Button
                color="danger"
                className="py-1.5 h-[36px]"
                isLoading={submitLessonForm.isLoading}
              >
                Salvar
              </Button>
            </form>
          ) : (
            <button
              className="flex items-center gap-2 group ml-1"
              onClick={() => {
                lessonForm.setValue("title", lessonQuery.data?.title)
                setIsEditingModuleTitle(true)
              }}
            >
              {lessonQuery.data?.title}
              <FontAwesomeIcon
                icon="fa-solid fa-pencil"
                className="text-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
              />
            </button>
          )}
        </h1>

        <NavLink
          to={`/admin/course-manager/${courseId}/lessons`}
          className="flex items-center gap-1 text-neutral-600 hover:text-neutral-700 transition duration-200"
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-left" />
          voltar
        </NavLink>
      </div>

      <div className="flex flex-col bg-white rounded-md mt-10 p-4 border border-neutral-200">
        {lessonQuery.isLoading ? (
          <>
            <Shimmer className="self-end h-[36px] w-[92px]" />
            <TableShimmer />
            <PaginationShimmer />
          </>
        ) : (
          <>
            <Button
              color="danger"
              className="self-end"
              onClick={() => setLectureModal(true)}
            >
              Criar aula
            </Button>
            {data?.length === 0 ? (
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
                    {data
                      ?.slice(pageStart, pageStart! + pageLimit)
                      .map(({ id, title, video, duration }, index) => (
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
                            <button
                              className="hover:-rotate-12 hover:-translate-y-1 transition-all duration-100"
                              onClick={() => {
                                setLectureModal(true)
                                setValue("id", id)
                                setValue("title", title)
                                setValue("video.url", video.url)
                                setValue("video.ref", video.ref)
                                setValue("duration", duration)
                                trigger()
                              }}
                            >
                              <FontAwesomeIcon
                                icon="fa-solid fa-pen-to-square"
                                className="text-base"
                              />
                            </button>
                          </Table.TBody.TR.TD>
                          <Table.TBody.TR.TD className="text-center w-10">
                            <button
                              className="text-red-500 hover:-rotate-12 hover:-translate-y-1 transition-all duration-200"
                              onClick={() => {
                                setConfig({
                                  show: true,
                                  callback: async () => {
                                    handleDeleteLecture(id)
                                  }
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
                      setLabel(`${start} - ${end} de ${total} aulas`)
                    }}
                  />
                )}
              </>
            )}
          </>
        )}

        <Dialog
          open={lectureModal}
          onClose={() => {
            setLectureModal(false)
            reset()
          }}
          title="Criar aula"
        >
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(handleSubmitLecture)}
          >
            <input type="text" hidden {...register("id")} />
            <div className="mb-4">
              <label
                className="text-sm text-neutral-700 font-medium mb-1.5 block"
                htmlFor="title"
              >
                Título*
              </label>
              <Input
                id="title"
                placeholder="Digite o título da aula"
                className="h-9"
                {...register("title", {
                  required: "O título é obrigatório"
                })}
              />
              {errors.title && (
                <span className="text-xs text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="text-sm text-neutral-700 font-medium mb-1.5 block"
                htmlFor="url"
              >
                URL do vídeo do YouTube*
              </label>
              <Input
                id="url"
                placeholder="https://www.youtube.com/watch?v=..."
                className="h-9"
                {...register("video.url", {
                  required: "A url do vídeo é obrigatória",
                  validate: (value) => {
                    const videoId = getYouTubeVideoId(value)
                    if (!videoId) {
                      return "Insira uma URL válida do YouTube com um ID de vídeo"
                    }
                    setValue("video.ref", videoId)
                    getDurationYouTubeVideo({ id: videoId }).then(
                      (duration) => {
                        if (duration) {
                          setValue("duration", duration)
                        }
                      }
                    )
                    return true
                  },
                  onChange: () => setValue("duration", "")
                })}
              />
              {errors.video?.url && (
                <span className="text-xs text-red-500">
                  {errors.video!.url.message}
                </span>
              )}
              {!!getYouTubeVideoId(watch("video.url")!) && (
                <YouTubeThumbnail
                  video={{ id: watch("video.ref")! }}
                  className="mt-3"
                />
              )}
            </div>
            <div className="mb-4">
              <label
                className="text-sm text-neutral-700 font-medium mb-1.5 block"
                htmlFor="duration"
              >
                Duração
              </label>
              <Input
                id="duration"
                placeholder="00:00"
                className="h-9"
                disabled
                {...register("duration")}
              />
              <span className="text-xs text-neutral-500">
                O campo duração é preenchido automaticamente
              </span>
            </div>

            <Button
              color="danger"
              disabled={!isValid}
              isLoading={submitLectureForm.isLoading}
            >
              {/* TODO: Adicionar loading icon */}
              Salvar
            </Button>
          </form>
        </Dialog>
      </div>
    </div>
  )
}
