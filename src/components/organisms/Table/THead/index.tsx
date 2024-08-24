import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"
import TR from "./TR"

const variants = tv({})
type THeadProps = ComponentProps<"thead"> & VariantProps<typeof variants> & {}

export default function THead({ className, ...rest }: THeadProps) {
  className = variants({ className })

  return <thead className={className} {...rest} />
}

THead.TR = TR
