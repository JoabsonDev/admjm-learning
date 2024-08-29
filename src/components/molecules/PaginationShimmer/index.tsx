import Shimmer from "@atoms/Shimmer"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const variants = tv({ base: "flex flex-col" })
type PaginationShimmerProps = ComponentProps<"div"> & {}

export default function PaginationShimmer({
  className,
  ...rest
}: PaginationShimmerProps) {
  className = variants({
    className
  })
  return (
    <div className={className} {...rest}>
      <Shimmer className="self-center h-7 w-56 mt-2" />
      <Shimmer className="self-center h-4 w-24 mt-2" />
    </div>
  )
}
