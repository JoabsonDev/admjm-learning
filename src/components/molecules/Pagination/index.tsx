import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { getCourseRange } from "@helpers/get-course-range"
import { getPaginationPages } from "@helpers/get-pagination-pages"
import { ComponentProps, useRef } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex flex-col items-center justify-center gap-2"
})
const buttonArrowVariants = tv({
  base: "bg-white text-neutral-700 hover:bg-neutral-700 hover:text-white aspect-square disabled:bg-neutral-300 disabled:text-white disabled:cursor-not-allowed",
  variants: {
    size: {
      sm: "text-xs py-0 px-1 h-7",
      md: "text-sm py-1 px-2 h-8"
    }
  }
})
const buttonArrowIconVariants = tv({
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm"
    }
  }
})
const buttonVariants = tv({
  base: "py-1 px-2 h-8 aspect-square font-semibold bg-white text-neutral-700 hover:bg-neutral-700 hover:text-white",
  variants: {
    active: {
      true: "bg-neutral-700 text-white"
    },
    size: {
      sm: "text-xs py-0 px-1 h-7",
      md: "text-sm py-1 px-2 h-8"
    }
  }
})
const labelVariants = tv({
  base: "text-neutral-500",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm"
    }
  }
})
type PaginationProps = ComponentProps<"div"> &
  VariantProps<typeof variants> &
  VariantProps<typeof buttonArrowVariants> & {
    data: Pagination
    onPageChange?: (page: number) => void
    setPaginationLabel?: (
      config: {
        start: number
        end: number
        total: number
      },
      setLabel: (label: string) => void
    ) => void
  }

// TODO: mudar todo o component de paginação para se adequar ao firebase
export default function Pagination({
  className,
  data,
  size = "sm",
  onPageChange,
  setPaginationLabel,
  ...rest
}: PaginationProps) {
  className = variants({ className })

  const { currentPage, total, pageSize } = data

  const totalPages = Math.ceil(total / pageSize)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    onPageChange?.(page)
  }

  const { start, end } = getCourseRange(data)
  const labelRef = useRef<string>(`${start} - ${end} de ${total} itens`)

  const setLabel = (label: string) => {
    labelRef.current = label
  }

  setPaginationLabel?.({ start, end, total }, setLabel)

  return (
    <div className={className} {...rest}>
      <div className="flex items-center justify-center gap-1 text-white">
        <Button
          onClick={() => handlePageChange(1)}
          className={buttonArrowVariants({ size })}
          disabled={currentPage === 1}
          aria-label={`ir para a página 1`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-angles-left"
            className={buttonArrowIconVariants({ size })}
          />
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          className={buttonArrowVariants({ size })}
          disabled={currentPage === 1}
          aria-label={`ir para a página ${currentPage - 1}`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-angle-left"
            className={buttonArrowIconVariants({ size })}
          />
        </Button>
        {getPaginationPages(currentPage, totalPages).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={buttonVariants({ active: page === currentPage, size })}
            aria-label={
              page === currentPage
                ? `página atual ${page}`
                : `ir para a página ${page}`
            }
          >
            {page}
          </Button>
        ))}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          className={buttonArrowVariants({ size })}
          disabled={currentPage === totalPages}
          aria-label={`ir para a página ${currentPage + 1}`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-angle-right"
            className={buttonArrowIconVariants({ size })}
          />
        </Button>
        <Button
          onClick={() => handlePageChange(totalPages)}
          className={buttonArrowVariants({ size })}
          disabled={currentPage === totalPages}
          aria-label={`ir para a página ${totalPages}`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-angles-right"
            className={buttonArrowIconVariants({ size })}
          />
        </Button>
      </div>

      <span className={labelVariants({ size })}>{labelRef.current}</span>
    </div>
  )
}
