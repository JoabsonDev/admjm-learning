import { ToggleAsideContext } from "@contexts/ToggleAsideProvider/ToggleAside.context"
import CourseCard from "@organisms/CourseCard"
import { ComponentProps, useContext } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "pt-24 pb-4 px-4 transition-all duration-300",
  variants: {
    hasAside: {
      true: "sm:ml-60"
    }
  }
})
type MainProps = ComponentProps<"main"> & VariantProps<typeof variants> & {}

export default function Main({ className, ...rest }: MainProps) {
  const { isVisible } = useContext(ToggleAsideContext)
  className = variants({ hasAside: isVisible, className })

  const continueCourses: CourseCard = {
    id: "1",
    title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
    // price: 25,
    image:
      "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-1.jpg",
    rating: 4.5,
    time: "25 hours",
    url: "/course/1"
  }

  return (
    <main className={className} {...rest}>
      <h2 className="mb-5 text-lg font-medium text-neutral-700">
        Continuar curso
      </h2>

      <CourseCard data={continueCourses} />
    </main>
  )
}
