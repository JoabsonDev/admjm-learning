import { ComponentProps, forwardRef } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "text-sm text-neutral-600 px-4 py-2 border border-neutral-300 focus-visible:border-neutral-500 outline-none rounded disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500 transition duration-200"
})

type TextAreaProps = ComponentProps<"textarea"> &
  VariantProps<typeof variants> & {}

export default forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { className, rows = 3, ...rest }: TextAreaProps,
  ref
) {
  className = variants({ className })

  return (
    <textarea ref={ref} className={className} rows={rows} {...rest}></textarea>
  )
})
