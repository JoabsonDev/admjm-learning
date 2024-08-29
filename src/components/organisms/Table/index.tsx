import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"
import TBody from "./TBody"
import THead from "./THead"

const variants = tv({
  base: "text-sm border-collapse table-auto w-full"
})
type TableProps = ComponentProps<"table"> & VariantProps<typeof variants> & {}

export default function Table({ className, ...rest }: TableProps) {
  className = variants({ className })

  return <table className={className} {...rest} />
}

Table.TBody = TBody
Table.THead = THead
