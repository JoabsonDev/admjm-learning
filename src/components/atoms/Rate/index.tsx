import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex items-center text-neutral-700"
  // variants: {
  //   readonly: {
  //     true: "text-yellow-500",
  //     false: "text-neutral-700"
  //   }
  // }
})
type RateProps = ComponentProps<"div"> &
  VariantProps<typeof variants> & {
    size: RatingSize
  }

// TODO: criar funcionalidade para dar nota com as estrelas
export default function Rate({ className, size, ...rest }: RateProps) {
  className = variants({ className })

  const length = Math.ceil(size)
  const isInteger = Number.isInteger(size)

  return (
    <div className={className} {...rest}>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => {
        if (!isInteger) {
          if (item === length)
            // meio
            return (
              <FontAwesomeIcon
                key={item}
                icon="fa-solid fa-star-half-stroke"
                className="text-sm"
              />
            )
        }

        if (item > length)
          // vazio
          return (
            <FontAwesomeIcon
              key={item}
              icon="fa-regular fa-star"
              className="text-sm"
            />
          )

        // inteiro
        return (
          <FontAwesomeIcon
            key={item}
            icon="fa-solid fa-star"
            className="text-sm"
          />
        )
      })}
    </div>
  )
}
