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
type StarsProps = ComponentProps<"div"> &
  VariantProps<typeof variants> & {
    size: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
  }

export default function Stars({ className, size, ...rest }: StarsProps) {
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
