import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import NavLink from "@atoms/NavLink"
import Stars from "@atoms/Stars"
import { formateCurrency } from "@helpers/formate-currency"
import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "p-2.5 bg-white rounded-sm border border-neutral-200 max-w-sm"
})
type CourseCardProps = ComponentProps<"div"> &
  VariantProps<typeof variants> & {
    data: CourseCard
  }

export default function CourseCard({
  className,
  data,
  ...rest
}: CourseCardProps) {
  className = variants({ className })
  const { title, image, rating = 0, time, price, url } = data

  return (
    <div className={className} {...rest}>
      <NavLink to={url} className="relative">
        <img className="w-full" src={image} alt={`Imagem do curso ${title}`} />

        <div className="group absolute inset-0 bg-gradient-to-b from-transparent to-neutral-700/35">
          <FontAwesomeIcon
            icon="fa-solid fa-play"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full grid place-items-center bg-neutral-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          {time && (
            <span className="absolute right-2.5 bottom-2.5 py-1 px-2.5 rounded bg-neutral-900/70 text-white text-xs font-medium">
              {time}
            </span>
          )}
        </div>
      </NavLink>

      <div className="px-1 py-2.5">
        <div className="flex items-center justify-between">
          <Stars size={rating} />

          <div className="relative group">
            <Button className="p-1">
              <FontAwesomeIcon
                icon="fa-solid fa-ellipsis-vertical"
                className="text-lg text-neutral-500"
              />
            </Button>

            <ul className="absolute -right-1 top-7 w-40 bg-white shadow-md rounded overflow-hidden border border-gray-100 hidden group-hover:block">
              <li>
                <Button className="w-full text-left flex items-center gap-1.5 rounded-none text-neutral-500 hover:bg-red-100 focus:bg-red-100 hover:text-neutral-700 text-sm">
                  <FontAwesomeIcon
                    icon="fa-solid fa-share-nodes"
                    className="text-base"
                  />
                  Share
                </Button>
              </li>
              <li>
                <Button className="w-full text-left flex items-center gap-1.5 rounded-none text-neutral-500 hover:bg-red-100 focus:bg-red-100 hover:text-neutral-700 text-sm">
                  <FontAwesomeIcon
                    icon="fa-regular fa-heart"
                    className="text-base"
                  />
                  Save
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <NavLink
          to={"/"}
          className="text-base font-semibold block mb-2 hover:no-underline"
        >
          Complete Python Bootcamp: Go from zero to hero in Python 3
        </NavLink>

        <p className="text-xs text-neutral-500 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam
          suscipit molestias, deserunt magni laudantium, corporis veniam rem ab
          cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt nam
          asperiores dolores magnam!
        </p>

        {price && (
          <div className="flex items-center justify-end mt-2 min-h-11">
            <Button className="p-2 text-neutral-700 w-10 group">
              <FontAwesomeIcon
                icon="fa-solid fa-cart-shopping"
                className="text-base group-hover:text-lg transition-all duration-200"
              />
            </Button>

            <span className="text-neutral-700 text-base font-medium">
              {formateCurrency({ value: price })}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
