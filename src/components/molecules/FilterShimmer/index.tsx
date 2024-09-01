import Shimmer from "@atoms/Shimmer"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const variants = tv({
  base: "flex items-center justify-end gap-1"
})
type FilterShimmerProps = ComponentProps<"div"> & {}

export default function FilterShimmer({
  className,
  ...rest
}: FilterShimmerProps) {
  className = variants({
    className
  })
  return (
    <div className={className} {...rest}>
      <Shimmer className="h-[34px] w-[34px]" />
      <Shimmer className="h-[34px] w-[34px]" />
      <Shimmer className="h-[34px] max-w-80 w-full" />
    </div>
  )
}
