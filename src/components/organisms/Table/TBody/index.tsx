import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"
import TR from "./TR"

const variants = tv({})
type TBodyProps = ComponentProps<"tbody"> & VariantProps<typeof variants> & {}

export default function TBody({ className, ...rest }: TBodyProps) {
  className = variants({ className })

  return <tbody className={className} {...rest} />
}

TBody.TR = TR
