import Shimmer from "@atoms/Shimmer"
import { ComponentProps } from "react"
import { tv } from "tailwind-variants"

const variants = tv({
  base: "flex flex-col bg-white rounded-md p-4 pb-10 border border-neutral-200 max-w-full lg:max-w-96 w-full self-start"
})
type CartCardTotalShimmerProps = ComponentProps<"div"> & {}

export default function CartCardTotalShimmer({
  className,
  ...rest
}: CartCardTotalShimmerProps) {
  className = variants({
    className
  })
  return (
    <div className={className} {...rest}>
      <Shimmer className="h-6 w-16" />
      <Shimmer className="min-h-[2px] w-16 mt-2.5" />
      <Shimmer className="h-5 mt-8" />
      <Shimmer className="min-h-[2px] mt-5" />
      <Shimmer className="h-5 mt-6" />
      <Shimmer className="min-h-[2px] mt-5" />
      <Shimmer className="h-7 mt-4" />
      <Shimmer className="min-h-[2px] mt-5" />
      <Shimmer className="h-5 w-36 mt-5" />
      <Shimmer className="h-9 mt-2" />
      <Shimmer className="h-9 mt-10" />
    </div>
  )
}
