import Shimmer from "@atoms/Shimmer"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const variants = tv({})
type TableShimmerProps = ComponentProps<"div"> & {}

export default function TableShimmer({
  className,
  ...rest
}: TableShimmerProps) {
  className = variants({
    className
  })
  return (
    <div className={className} {...rest}>
      <Shimmer className="h-[30px] mt-10" />
      <Shimmer className="h-10 mt-2" />
      <Shimmer className="h-10 mt-2" />
      <Shimmer className="h-10 mt-2" />
    </div>
  )
}
