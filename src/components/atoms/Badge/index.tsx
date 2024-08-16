import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex items-center justify-center rounded-full w-4 text-[9px] text-white bg-red-500 aspect-square leading-[0px]"
})
type BadgeProps = ComponentProps<"span"> & VariantProps<typeof variants> & {}

export default function Badge({ className, ...rest }: BadgeProps) {
  className = variants({ className })

  return <span className={className} {...rest} />
}
