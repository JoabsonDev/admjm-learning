import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { calculateTotalDuration } from "@helpers/calculate-total-duration"
import { useCourse } from "@store/course"
import { ComponentProps, useState } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({ base: "flex flex-col gap-0.5" })
type CourseContentAccordionProps = ComponentProps<"div"> &
  VariantProps<typeof variants> & {}

export default function CourseContentAccordion({
  className,
  ...rest
}: CourseContentAccordionProps) {
  className = variants({ className })

  const { course } = useCourse(({ course }) => ({ course }))

  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <div className={className} {...rest}>
      {course?.lessons?.map(({ title, lectures, id }, index) => {
        const duration = calculateTotalDuration(lectures).formated
        const numberLectures = lectures.length
        return (
          <div
            key={id}
            className={`grid overflow-hidden border border-neutral-200 border-b-transparent transition-all duration-300 ease-in-out ${
              activeIndex === index
                ? "grid-rows-[auto_1fr]"
                : "grid-rows-[auto_0fr]"
            }`}
          >
            <Button
              aria-expanded={activeIndex === index}
              className="flex items-center p-4 bg-white border-b border-neutral-200 rounded-none h-[62px]"
              onClick={() => {
                if (activeIndex === index) {
                  setActiveIndex(null)
                  return
                }

                setActiveIndex(index)
              }}
            >
              <div className="basis-1/2 flex items-center gap-4 text-neutral-700">
                <FontAwesomeIcon icon="fa-solid fa-film" />
                <span className="text-sm md:text-base font-medium">
                  {title}
                </span>
              </div>
              <div className="basis-1/2 flex items-center justify-end text-neutral-500 text-sm md:text-base">
                <span className="">
                  {numberLectures} {numberLectures > 1 ? "aulas" : "aula"}
                </span>
                <span className="block w-[42%] text-right">{duration}</span>
              </div>
            </Button>
            <ul className="bg-white text-neutral-500 text-sm overflow-hidden">
              {lectures.map(({ title, duration }) => {
                return (
                  <li
                    key={title}
                    className="flex items-center px-4 py-3 bg-white border-b border-neutral-200"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <FontAwesomeIcon
                        icon="fa-regular fa-file"
                        className="text-base"
                      />
                      <span className="text-sm md:text-base">{title}</span>
                    </div>
                    <span>{duration}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
