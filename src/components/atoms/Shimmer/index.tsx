import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "inline-block bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer h-4 w-full rounded"
})
type ShimmerProps = ComponentProps<"span"> & VariantProps<typeof variants> & {}

export default function Shimmer({ className, ...rest }: ShimmerProps) {
  className = variants({ className })

  return <span className={className} {...rest} />
}
