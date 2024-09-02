import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { formateCurrency } from "@helpers/formate-currency"
import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "bg-white rounded-md p-4 pt-1 border border-neutral-200 relative"
})
type CartCardProps = ComponentProps<"div"> &
  VariantProps<typeof variants> & {
    data: Course
    onRemove?: (courseId: string) => void
  }

export default function CartCard({
  className,
  data,
  onRemove,
  ...rest
}: CartCardProps) {
  className = variants({ className })
  const { id, title, description, thumbnail, price } = data
  return (
    <div className={className} {...rest}>
      <button onClick={() => onRemove!(id)}>
        <FontAwesomeIcon
          icon="fa-solid fa-xmark"
          className="absolute top-3 right-4 text-md text-neutral-400 hover:text-neutral-700 transition duration-200"
        />
      </button>
      <div className="flex gap-4 flex-col xl:flex-row">
        {thumbnail?.url ? (
          <img
            className="max-h-full md:max-h-60 lg:max-h-20 xl:max-h-24 aspect-video object-contain lg:object-cover bg-gradient-to-b from-transparent to-neutral-700/35 border border-neutral-100"
            src={thumbnail.url}
            alt={`Imagem do curso ${title}`}
          />
        ) : (
          <div className="h-full md:h-60 lg:h-20 xl:h-24 aspect-video flex items-center justify-center bg-gradient-to-b from-transparent to-neutral-700/35">
            <FontAwesomeIcon
              icon="fa-regular fa-image"
              className="w-full object-cover flex items-center justify-center text-[50px] text-neutral-500"
            />
          </div>
        )}

        <div className="flex flex-col flex-1">
          <h2 className="text-base font-semibold text-neutral-700 mb-2.5">
            {title}
          </h2>
          <p className="text-xs text-neutral-500 line-clamp-3">{description}</p>
          <span className="mt-5 text-neutral-700 font-semibold">
            {formateCurrency({ value: price! })}
          </span>
        </div>
      </div>
    </div>
  )
}
