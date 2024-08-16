import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "min-h-9 bg-neutral-100 rounded overflow-hidden px-4 py-1 flex flex-row-reverse items-center gap-1"
})

type SearchTypes = "search"

type SearchProps = Omit<ComponentProps<"input">, "type"> & {
  type?: SearchTypes
} & VariantProps<typeof variants>

export default function Search({
  className,
  type = "search",
  ...rest
}: SearchProps) {
  className = variants({ className })
  console.log(className)

  return (
    <div className={className}>
      {" "}
      <input
        className="border-none outline-none bg-transparent w-full text-xs font-medium text-neutral-600 placeholder:focus-visible:text-neutral-500 peer transition duration-200"
        type={type}
        {...rest}
      />
      <FontAwesomeIcon
        icon="fa-solid fa-magnifying-glass"
        className="text-xs text-neutral-400 peer-focus-visible:text-neutral-600 transition duration-200"
      />
    </div>
  )
}
