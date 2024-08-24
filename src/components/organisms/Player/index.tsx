import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Step from "@organisms/Step"
import YouTubePlayer from "@organisms/YouTubePlayer"
import { useCourse } from "@store/course"
import { ComponentProps, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({})
type PlayerProps = ComponentProps<"div"> & VariantProps<typeof variants> & {}

export default function Player({ className, ...rest }: PlayerProps) {
  className = variants({ className })
  const { courseId, lectureId } = useParams()

  const { done, lecture, setLecture, course } = useCourse(
    ({ done, lecture, setLecture, course }) => ({
      done,
      lecture,
      setLecture,
      course
    })
  )
  const { previous, next } = lecture

  function handleFinish() {
    console.log("finish")
  }

  const [activeStep, setActiveStep] = useState<number>(1)

  const steps: Step[] = [
    {
      title: "Curso",
      done,
      details: {
        title: "Conclusão do Curso",
        guidelines: {
          title: "Orientações:",
          items: [
            "Este é o primeiro passo em sua jornada de aprendizado. Para avançar, é necessário completar todas as etapas do curso.",
            "Acesse todo o conteúdo disponível, incluindo videoaulas, materiais de leitura, quizzes e/ou atividades práticas.",
            "Você só poderá prosseguir para a prova após concluir 100% do curso."
          ]
        },
        rules: {
          title: "Regras:",
          items: [
            "A navegação entre módulos é liberada, mas a conclusão de todos os módulos é obrigatória para desbloquear o próximo step.",
            "Fique atento aos requisitos específicos de cada módulo. Alguns podem exigir atividades práticas ou a submissão de tarefas.",
            "Você pode revisar o conteúdo quantas vezes quiser antes de concluir o curso."
          ]
        }
      }
    },
    {
      title: "Prova",
      done: false,
      details: {
        title: "Prova de Avaliação",
        guidelines: {
          title: "Orientações:",
          items: [
            "Agora que você concluiu o curso, é hora de testar seus conhecimentos.",
            // TODO: pegar do backend ou 2h padrão
            "A prova terá um tempo limite de 2 horas",
            "Certifique-se de estar preparado antes de iniciar, pois o tempo começará a contar assim que você começar a prova."
          ]
        },
        rules: {
          title: "Regras:",
          items: [
            "A prova deve ser concluída dentro do tempo estipulado. Após o tempo limite, a prova será automaticamente finalizada e enviada.",
            "Não será permitido pausar ou retomar a prova em outro momento.",
            "Certifique-se de ter uma conexão estável com a internet antes de iniciar a prova.",
            "Caso não obtenha a nota mínima necessária, você poderá revisar o curso e refazer a prova após um intervalo de tempo determinado."
          ]
        }
      },
      action: {
        label: "Iniciar Prova",
        onClick: () => {
          console.log("iniciar prova")
        }
      }
    },
    {
      title: "Certificado",
      done: false,
      details: {
        title: "Emissão do Certificado",
        guidelines: {
          title: "Orientações:",
          items: [
            "Parabéns por concluir o curso e passar na prova! Agora, precisamos das suas informações para emitir seu certificado.",
            "Complete seu cadastro com todos os dados requisitados, incluindo nome completo, endereço para envio, e qualquer outra informação necessária."
          ]
        },
        rules: {
          title: "Regras:",
          items: [
            "Todos os campos do cadastro são obrigatórios para que possamos emitir e enviar seu certificado corretamente.",
            "Verifique se todas as informações estão corretas, especialmente o nome que será impresso no certificado e o endereço de envio.",
            "O certificado será enviado após a validação dos dados e confirmação do endereço."
          ]
        }
      },
      action: {
        label: "Solicitar Certificado",
        onClick: () => {
          console.log("solicitar certificado")
        }
      }
    }
  ]

  useEffect(() => {
    if (lectureId !== lecture.current?.id) setLecture(course!, lectureId!)
  }, [lectureId])

  useEffect(() => {
    setActiveStep(steps.findIndex((step) => !step.done) + 1 || 0)
  }, [])

  return (
    lectureId && (
      <div className={className} {...rest}>
        <div className="relative">
          {previous && (
            <a
              href={`/course/${courseId}/lecture/${previous.id}`}
              className="absolute px-2 py-4 md:py-8 rounded-none rounded-tr rounded-br top-1/2 left-0 -translate-y-1/2 opacity-50 hover:opacity-100"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-angle-left"
                className="text-neutral-200 text-2xl md:text-4xl"
              />
            </a>
          )}

          <YouTubePlayer
            videoId={lecture.current?.video.ref}
            onFinish={handleFinish}
          />

          {next && (
            <a
              href={`/course/${courseId}/lecture/${next.id}`}
              className="absolute px-2 py-4 md:py-8 rounded-none rounded-tl rounded-bl top-1/2 right-0 -translate-y-1/2 opacity-50 hover:opacity-100"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-angle-right"
                className="text-neutral-200 text-2xl md:text-4xl"
              />
            </a>
          )}
        </div>

        <div className="px-4">
          <Step
            items={steps}
            active={activeStep}
            setActive={setActiveStep}
            className="mt-10"
          />

          <div className="bg-white rounded-md mt-10 border border-neutral-200 pb-4">
            {steps.map(
              ({ details, title, action, done }, index) =>
                activeStep === index + 1 && (
                  <div className="flex flex-col" key={title}>
                    <div>
                      <h2 className="border-b border-neutral-200 px-4 py-2 text-neutral-700 font-semibold text-xl">
                        {details.title}
                      </h2>

                      <div className="p-4">
                        <ul className="list-decimal text-neutral-600 mb-6">
                          <h3 className="text-neutral-700 font-semibold mb-2">
                            <i className="fa-solid fa-info-circle text-blue-500"></i>{" "}
                            {details.guidelines.title}
                          </h3>
                          {details.guidelines.items.map((item) => (
                            <li key={item} className="ml-10 text-sm">
                              {item}
                            </li>
                          ))}
                        </ul>

                        <ul className="list-decimal text-neutral-600">
                          <h3 className="text-neutral-700 font-semibold mb-2">
                            <i className="fa-solid fa-exclamation-circle text-red-500"></i>{" "}
                            {details.rules.title}
                          </h3>
                          {details.rules.items.map((item) => (
                            <li key={item} className="ml-10 text-sm">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {action && (
                      <Button
                        color="danger"
                        className="self-end mt-8 mx-4"
                        onClick={action?.onClick}
                        disabled={done}
                      >
                        {action?.label}
                      </Button>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    )
  )
}
