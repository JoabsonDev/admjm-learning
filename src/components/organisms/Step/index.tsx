import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex items-center justify-center gap-1"
})

const stepBulletVariants = tv({
  base: "flex items-center justify-center w-10 aspect-square rounded-full font-semibold bg-red-300 text-white relative group-disabled:bg-gray-300 group-disabled:after:bg-gray-300",
  variants: {
    notLast: {
      true: "after:content[''] after:absolute after:h-[3px] after:w-[100px] after:bg-red-300 after:top-[18px] after:-right-[104px]"
    },
    done: {
      true: "bg-green-600 after:bg-green-600"
    },
    activeAndDone: {
      true: "animate-pulse-bullet-green"
    },
    activeOnly: {
      true: "animate-pulse-bullet-red"
    },
    disabled: {
      true: "bg-gray-300 text-gray-500"
    }
  }
})

const stepLabelVariants = tv({
  base: "font-bold text-neutral-500",
  variants: {
    done: {
      true: "text-neutral-700"
    },
    disabled: {
      true: "text-gray-400"
    }
  }
})

type StepProps = ComponentProps<"ul"> &
  VariantProps<typeof variants> & {
    active?: number
    setActive?: (step: number) => void
    items: Step[]
  }

export default function Step({
  className,
  setActive,
  active,
  items,
  ...rest
}: StepProps) {
  className = variants({ className })

  return (
    <ul className={className} {...rest}>
      {items.map(({ done, title }, index) => (
        <li key={index} className="w-36">
          <button
            className="flex items-center justify-center w-full flex-col gap-2 group disabled:cursor-not-allowed"
            onClick={() => {
              setActive!(index + 1)
            }}
            disabled={index > 0 && !items[index - 1].done}
          >
            <span
              className={stepBulletVariants({
                done,
                disabled: index > 0 && !items[index - 1].done,
                activeAndDone: active! - 1 === index && items[index].done,
                activeOnly: active! - 1 === index && !items[index].done,
                notLast: items.length !== index + 1
              })}
            >
              {items[index - 1]?.done ? (
                <FontAwesomeIcon icon="fa-solid fa-check" />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={stepLabelVariants({
                done,
                disabled: index > 0 && !items[index - 1].done
              })}
            >
              {title}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
