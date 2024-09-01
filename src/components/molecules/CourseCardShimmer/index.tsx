import Shimmer from "@atoms/Shimmer"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const variants = tv({
  base: "p-2.5 bg-white rounded-sm border border-neutral-200 max-w-sm min-h-[400px] flex flex-col"
})
type CourseCardShimmerProps = ComponentProps<"div"> & {}

export default function CourseCardShimmer({
  className,
  ...rest
}: CourseCardShimmerProps) {
  className = variants({
    className
  })
  return (
    <div className={className} {...rest}>
      <Shimmer className="aspect-video w-full" />
      <div className="px-1 py-2.5 flex flex-col flex-1">
        <Shimmer className="w-20 h-5 mt-2" />
        <Shimmer className="h-10 mt-2" />
        <Shimmer className="h-12 mt-2" />
        <div className="flex items-center justify-end mt-auto h-10">
          <Shimmer className="w-24 h-6" />
        </div>
      </div>
    </div>
  )
}
