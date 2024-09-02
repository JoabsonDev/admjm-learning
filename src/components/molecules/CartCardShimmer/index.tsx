import Shimmer from "@atoms/Shimmer"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const variants = tv({
  base: "bg-white rounded-md p-4 border border-neutral-200 flex gap-4 flex-col xl:flex-row"
})
type CartCardShimmerProps = ComponentProps<"div"> & {}

export default function CartCardShimmer({
  className,
  ...rest
}: CartCardShimmerProps) {
  className = variants({
    className
  })
  return (
    <div className={className} {...rest}>
      <Shimmer className="h-full md:h-60 lg:h-32 xl:h-24 aspect-video md:w-auto" />

      <div className="flex-1 basis-full">
        <Shimmer className="w-full h-6" />
        <Shimmer className="w-full h-8" />
        <Shimmer className="w-20 h-6" />
      </div>
    </div>
  )
}
