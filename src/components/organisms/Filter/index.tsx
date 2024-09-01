import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Search from "@atoms/Search"
import { ChangeEvent, ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex items-center justify-end gap-1"
})

type FilterProps = ComponentProps<"div"> &
  VariantProps<typeof variants> & {
    config: FilterConfig
    onFilter?: (config: FilterConfig) => void
  }

export default function Filter({
  className,
  config,
  onFilter,
  ...rest
}: FilterProps) {
  className = variants({ className })

  function handleCheckboxChange(
    event: ChangeEvent<HTMLInputElement>,
    order: Order
  ) {
    onFilter?.({
      ...config,
      order: event.target.checked ? order : null
    })
  }

  return (
    <div className={className} {...rest}>
      <label
        className="relative bg-neutral-700 hover:bg-red-500 has-[:checked]:bg-red-500 text-neutral-100 px-1 py-0 h-[34px] aspect-square flex items-center justify-center rounded has-[:focus-visible]:outline-ring"
        aria-label="ordenar de A-Z"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-down-a-z text-base" />
        <input
          type="checkbox"
          className="absolute outline-none opacity-0"
          onChange={(e) => {
            handleCheckboxChange(e, "asc")
          }}
          checked={config.order === "asc"}
        />
      </label>
      <label
        className="relative bg-neutral-700 hover:bg-red-500 has-[:checked]:bg-red-500 text-neutral-100 px-1 py-0 h-[34px] aspect-square flex items-center justify-center rounded has-[:focus-visible]:outline-ring"
        aria-label="ordenar de Z-A"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-up-a-z text-base" />
        <input
          type="checkbox"
          className="absolute outline-none opacity-0"
          onChange={(e) => {
            handleCheckboxChange(e, "desc")
          }}
          checked={config.order === "desc"}
        />
      </label>
      <Search
        className="max-w-80 w-full flex bg-white border border-neutral-200 has-[:focus-visible]:border-neutral-300"
        placeholder="Filtrar pelo nome do curso"
        onChange={({ target }) => {
          onFilter?.({
            ...config,
            value: target.value
          })
        }}
        value={config.value}
      />
    </div>
  )
}
