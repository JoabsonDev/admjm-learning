import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Switch from "@atoms/Switch"
import { calculateTotalDuration } from "@helpers/calculate-total-duration"
import { useCourse } from "@store/course"
import { useSidebarStore } from "@store/sidebar"
import { useYouTubeStore } from "@store/youtube"
import { ComponentProps, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "fixed flex flex-col z-10 w-[300px] bg-white top-16 bottom-0 border border-neutral-300 transition-all duration-300",
  variants: {
    isVisible: {
      true: "right-0",
      false: "-right-[300px]"
    }
  }
})
type CourseSidebarProps = ComponentProps<"aside"> &
  VariantProps<typeof variants> & {}

export default function CourseSidebar({
  className,
  ...rest
}: CourseSidebarProps) {
  const { isVisible, setIsVisible } = useSidebarStore(
    ({ isVisible, setIsVisible }) => ({ isVisible, setIsVisible })
  )

  className = variants({ isVisible, className })

  const { autoplay, setAutoplay, player, setPlayer } = useYouTubeStore(
    ({ autoplay, setAutoplay, player, setPlayer }) => ({
      autoplay,
      setAutoplay,
      player,
      setPlayer
    })
  )

  const { courseId, lectureId } = useParams()

  const { course, activeLesson, setActiveLesson } = useCourse(
    ({ course, activeLesson, setActiveLesson }) => ({
      course,
      activeLesson,
      setActiveLesson
    })
  )

  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  useEffect(() => {
    setActiveLesson(course!, lectureId!)
    setActiveIndex(activeLesson)
  }, [activeLesson, course, lectureId, setActiveLesson])

  return (
    <aside className={className} {...rest}>
      <Button
        className={`px-1 py-1 absolute -left-[22px] top-4 bg-white rounded-none rounded-tl rounded-bl ${
          isVisible ? "opacity-0" : ""
        }`}
        onClick={setIsVisible}
        aria-hidden={isVisible}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-angle-left"
          className="text-neutral-700"
        />
      </Button>
      <div className="px-4 py-2 border-b border-neutral-300">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-neutral-700">
            Conteúdo do curso
          </h2>
          <Button
            className={`px-2 py-0 ${!isVisible ? "opacity-0" : ""}`}
            onClick={setIsVisible}
            aria-hidden={!isVisible}
          >
            <FontAwesomeIcon
              icon="fa-solid fa-xmark"
              className="text-neutral-700"
            />
          </Button>
        </div>
        <Switch
          label="Iniciar vídeo automaticamente"
          size="sm"
          checked={autoplay === 1}
          onChange={(event) => setAutoplay(event.target.checked ? 1 : 0)}
        />
      </div>

      <div className="flex flex-col overflow-y-auto pretty-scroll">
        {course?.lessons?.map(({ title, lectures, id }, index) => {
          const duration = calculateTotalDuration(lectures).formated
          const numberLectures = lectures.length
          const completedLectures = lectures.filter(
            ({ completed }) => completed
          ).length

          return (
            <div
              key={id}
              className={`grid transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "grid-rows-[auto_1fr]"
                  : "grid-rows-[auto_0fr]"
              }`}
            >
              <Button
                aria-expanded={activeIndex === index}
                className="text-left px-4 py-2 h-16 bg-neutral-100 border-b border-neutral-200 rounded-none"
                onClick={() => {
                  if (activeIndex === index) {
                    setActiveIndex(null)
                    return
                  }

                  setActiveIndex(index)
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">
                    {title}
                  </span>
                  <FontAwesomeIcon
                    icon="fa-solid fa-caret-down"
                    className={`text-base text-neutral-700 transition-all duration-300 ease-in-out ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <span className="text-xs text-neutral-500">
                  {completedLectures} / {numberLectures} | {duration}
                </span>
              </Button>
              <ul
                className={activeIndex === index ? "" : "overflow-hidden"}
                aria-hidden={activeIndex !== index}
              >
                {lectures.map(({ title, duration, completed, id }) => {
                  return (
                    <li key={title}>
                      <a
                        onClick={() => setPlayer(null)}
                        href={`/course/${courseId}/lecture/${id}`}
                        className={`flex items-center flex-wrap gap-2 hover:no-underline hover:bg-neutral-200 px-4 py-2 ${
                          lectureId === id ? "bg-neutral-200" : ""
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={
                            lectureId === id
                              ? "fa-solid fa-circle-play"
                              : "fa-regular fa-file-video"
                          }
                          className={`text-neutral-500 ${
                            lectureId === id
                              ? "animate-pulse text-2xl"
                              : "text-[32px]"
                          }`}
                        />

                        <div className="flex flex-col flex-1">
                          <span className="text-sm text-neutral-500 font-medium">
                            {title}
                          </span>
                          <span className="text-xs text-neutral-500">
                            {duration}
                          </span>
                        </div>
                        <FontAwesomeIcon
                          icon="fa-solid fa-circle-check"
                          className={`text-sm ${
                            completed ? "text-green-600" : "text-neutral-500"
                          }`}
                        />

                        {player && player.videoId === id && (
                          <div
                            className="h-1 w-full rounded-sm bg-neutral-300 overflow-hidden"
                            aria-hidden={true}
                          >
                            <div
                              style={{
                                width: `${
                                  (player.current / player.total) * 100
                                }%`
                              }}
                              className={`h-full bg-red-600`}
                            ></div>
                          </div>
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
