import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Input from "@atoms/Input"
import NavLink from "@atoms/NavLink"
import TextArea from "@atoms/TextArea"
import ImageUploader from "@molecules/ImageUploader"
import { courseService } from "@services/course"
import { useAlert } from "@store/alert"
import { useCourse } from "@store/course"
import { usePrompt } from "@store/prompt"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"

const { deleteCourse } = courseService

export default function CourseManager() {
  const { courseId } = useParams()
  const navigate = useNavigate()

  const { setCourse, course } = useCourse(({ setCourse, course }) => ({
    setCourse,
    course
  }))

  const { getCourse, createCourse, updateCourse } = courseService
  const { addAlert } = useAlert()
  const { setConfig } = usePrompt()

  useQuery(
    ["course", courseId],
    async () => {
      if (courseId) {
        try {
          const course = await getCourse(courseId)
          if (course) setCourse(course)
        } catch {
          addAlert(
            "Erro ao carregar o curso. Tente novamente mais tarde.",
            "error"
          )
        }
      }
    },
    { refetchOnWindowFocus: false }
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
    trigger
  } = useForm<Partial<Course>>({ mode: "onTouched" })
  const [thumbnailUploadProgress, setThumbnailUploadProgress] =
    useState<number>(0)
  const [readonly, setReadonly] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const submitForm = async (data: Partial<Course>) => {
    setIsLoading(true)
    try {
      if (data.price) data.price = Number(data.price)

      if (courseId) {
        await updateCourse(courseId, data, setThumbnailUploadProgress)
        addAlert("Curso atualizado com sucesso!", "success")
      } else {
        const id = await createCourse(data, setThumbnailUploadProgress)
        if (!id) return
        addAlert("Curso criado com sucesso!", "success")
        reset()
        setReadonly(true)
        navigate(`/admin/course-manager/${id}`)
      }
    } catch {
      addAlert("Erro ao salvar o curso. Tente novamente mais tarde.", "error")
    } finally {
      setReadonly(true)
      setIsLoading(false)
    }
  }

  const deleteCourseMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteCourse(id)
    },
    onSuccess: () => {
      addAlert("Curso deletado com sucesso", "success")
      navigate(`/admin`)
    },
    onError: () => {
      addAlert("Erro ao deletar o curso. Tente novamente mais tarde.", "error")
    }
  })

  useEffect(() => {
    if (!courseId) {
      setReadonly(false)
    }
  }, [courseId])

  useEffect(() => {
    if (courseId && course) {
      const { title, description, price, thumbnail } = course!
      setValue("title", title)
      setValue("description", description)
      setValue("price", price)
      setValue("thumbnail", thumbnail)
    }
  }, [courseId, course, setValue])

  return (
    <div className="py-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-neutral-700">
          <FontAwesomeIcon
            icon="fa-solid fa-photo-film"
            className="text-md w-6"
          />
          {courseId ? " Editar curso" : " Criar novo curso"}
        </h1>

        <NavLink
          to={"/admin"}
          className="flex items-center gap-1 text-neutral-600 hover:text-neutral-700 transition duration-200"
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-left" />
          voltar
        </NavLink>
      </div>

      <div className="bg-white rounded-md mt-10 p-4 border border-neutral-200">
        <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
          {courseId && (
            <button
              type="button"
              onClick={() => {
                setReadonly(!readonly)
                trigger()
              }}
              className="self-end"
            >
              {readonly ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-pencil"
                  className="text-md text-neutral-600"
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-xmark"
                  className="text-md text-red-600"
                />
              )}
            </button>
          )}

          <div className="mb-4">
            <label
              className="text-sm text-neutral-700 font-medium mb-1.5 block"
              htmlFor="title"
            >
              Título*
            </label>
            <Input
              id="title"
              placeholder="Digite o título do curso"
              className="h-9"
              {...register("title", {
                required: "O título é obrigatório"
              })}
              disabled={readonly}
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
              htmlFor="description"
            >
              Descrição
            </label>
            <TextArea
              id="description"
              placeholder="Digite a descrição do curso"
              className="w-full"
              {...register("description")}
              disabled={readonly}
            ></TextArea>
          </div>
          <div className="mb-4">
            <label
              className="text-sm text-neutral-700 font-medium mb-1.5 block"
              htmlFor="price"
            >
              Preço*
            </label>
            <Input
              id="price"
              type="text"
              placeholder="9.99"
              className="h-9"
              {...register("price", {
                required: "O preço é obrigatório.",
                validate: {
                  noComma: (value: string | number | undefined) => {
                    if (typeof value === "string" && value.includes(",")) {
                      return "Apenas o ponto (.) é permitido como separador decimal!"
                    }
                    return true
                  },
                  isValidNumber: (value: string | number | undefined) => {
                    if (value === undefined) return true
                    const stringValue = String(value)
                    // Remove espaços e substitui vírgulas por pontos
                    const cleanValue = stringValue.replace(/,/g, ".").trim()
                    // Permite valores incompletos, mas valida números válidos quando o campo perde o foco
                    if (cleanValue === "" || /^\d+(\.\d+)?$/.test(cleanValue)) {
                      return true
                    }
                    return "O preço deve ser um número válido. Use apenas números e um ponto como separador decimal!"
                  }
                }
              })}
              disabled={readonly}
            />
            {errors.price && (
              <span className="text-xs text-red-500">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="text-sm text-neutral-700 font-medium mb-1.5 block"
              htmlFor="thumbnail"
            >
              Miniatura
            </label>
            <ImageUploader
              id="thumbnail"
              thumbnail={courseId ? course?.thumbnail?.url : ""}
              progress={thumbnailUploadProgress}
              {...register("thumbnail")}
              disabled={readonly}
            />
          </div>

          <div className="flex justify-end gap-4 mt-10">
            {courseId && (
              <NavLink
                to={`/admin/course-manager/${courseId}/lessons`}
                className="text-sm py-2 px-4 bg-blue-600 text-white hover:bg-gray-800 hover:text-white hover:no-underline rounded transition duration-200 flex items-center gap-1"
              >
                <FontAwesomeIcon icon="fa-solid fa-plus" className="text-sm" />
                <span>
                  {course?.lessons && course.lessons.length > 0
                    ? "Gerenciar módulos"
                    : "Adicionar módulos"}
                </span>
              </NavLink>
            )}

            {!readonly && (
              <Button color="danger" disabled={!isValid} isLoading={isLoading}>
                {courseId ? "Atualizar curso" : "Criar curso"}
              </Button>
            )}

            {!readonly && courseId && (
              <Button
                type="button"
                className="flex items-center gap-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => {
                  setConfig({
                    show: true,
                    callback: () => deleteCourseMutation.mutate(courseId)
                  })
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-trash-can"
                  className="text-sm"
                />
                Deletar curso
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
