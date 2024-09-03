import Shimmer from "@atoms/Shimmer"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const variants = tv({ base: "flex flex-col" })
type FirebasePaginationShimmerProps = ComponentProps<"div"> & {}

export default function FirebasePaginationShimmer({
  className,
  ...rest
}: FirebasePaginationShimmerProps) {
  className = variants({
    className
  })
  return (
    <div className={className} {...rest}>
      <Shimmer className="self-center h-7 w-20 mt-2" />
      <Shimmer className="self-center h-4 w-28 mt-2" />
    </div>
  )
}
