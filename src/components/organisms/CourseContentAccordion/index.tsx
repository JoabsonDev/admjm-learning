import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
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

  const accordionData = [
    {
      title: "Introduction to this Course",
      numberLectures: 8,
      duration: "22:08",
      lectures: [
        {
          title: "A Note On Asking For Help",
          duration: "00:12"
        }
      ]
    },
    {
      title: "Introduction to Front End Development",
      numberLectures: 6,
      duration: "27:26",
      lectures: [
        {
          title: "Note about Setting Up Front-End Developer Environment",
          duration: "00:33"
        }
      ]
    },
    {
      title: "Introduction to HTML",
      numberLectures: 13,
      duration: "58:55",
      lectures: [
        {
          title: "Unit Objectives",
          duration: "01:38"
        }
      ]
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className={className} {...rest}>
      {accordionData.map(
        ({ title, numberLectures, duration, lectures }, index) => {
          return (
            <div
              key={title}
              className={`grid overflow-hidden border border-neutral-200 border-b-transparent transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "grid-rows-[auto_1fr]"
                  : "grid-rows-[auto_0fr]"
              }`}
            >
              <Button
                aria-expanded={activeIndex === index}
                className="flex items-center p-4 bg-white border-b border-neutral-200 rounded-none h-[62px]"
                onClick={() => setActiveIndex(index)}
              >
                <div className="basis-1/2 flex items-center gap-4 text-neutral-700">
                  <FontAwesomeIcon icon="fa-solid fa-film" />
                  <span className="text-base font-medium">{title}</span>
                </div>
                <div className="basis-1/2 flex items-center justify-end text-neutral-500">
                  <span className="">
                    {numberLectures}{" "}
                    {numberLectures > 1 ? "lectures" : "lecture"}
                  </span>
                  <span className="block w-[42%] text-right">{duration}</span>
                </div>
              </Button>
              <div className="bg-white text-neutral-500 text-sm overflow-hidden">
                {lectures.map(({ title, duration }) => {
                  return (
                    <div
                      key={title}
                      className="flex items-center px-4 py-3 bg-white border-b border-neutral-200"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <FontAwesomeIcon
                          icon="fa-regular fa-file"
                          className="text-base"
                        />
                        <span>{title}</span>
                      </div>
                      <span>{duration}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}
