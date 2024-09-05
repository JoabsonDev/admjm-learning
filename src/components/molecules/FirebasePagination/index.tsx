import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { ComponentProps, useRef } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex flex-col items-center justify-center gap-2"
})
const buttonArrowVariants = tv({
  base: "rounded bg-white text-neutral-700 hover:bg-neutral-700 hover:text-white aspect-square disabled:bg-neutral-300 disabled:text-white disabled:cursor-not-allowed",
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
const labelVariants = tv({
  base: "text-neutral-500",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm"
    }
  }
})

type FirebasePaginationProps = ComponentProps<"div"> &
  VariantProps<typeof variants> &
  VariantProps<typeof buttonArrowIconVariants> & {
    pagination: FirebasePaginationType
    onPaginationChange?: (pagination: FirebasePaginationType) => void
    loadedDataLength?: number
    onRefetch?: () => void
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
export default function FirebasePagination({
  className,
  pagination,
  onPaginationChange,
  onRefetch,
  loadedDataLength,
  setPaginationLabel,
  size = "sm",
  ...rest
}: FirebasePaginationProps) {
  className = variants({ className })

  const { pageLimit, total, currentPage = 1 } = pagination

  const handleChangePage = (action: "next" | "prev") => {
    const totalPages = total === 0 ? 0 : Math.ceil(total / pageLimit) || 1
    const loadedPages = Math.ceil((loadedDataLength ?? 0) / pageLimit)

    if (action === "next") {
      onPaginationChange?.({
        ...pagination,
        currentPage: currentPage + 1,
        pageStart: currentPage * pageLimit,
        totalPages
      })
    }

    if (action === "prev") {
      onPaginationChange?.({
        ...pagination,
        currentPage: currentPage - 1,
        pageStart: (currentPage - 2) * pageLimit,
        totalPages
      })
    }

    if (action === "next" && currentPage + 1 > loadedPages) {
      onRefetch?.()
    }
  }

  const setLabel = (label: string) => {
    labelRef.current = label
  }

  const start = (currentPage - 1) * pageLimit + 1
  const end = Math.min(currentPage * pageLimit, total)

  const labelRef = useRef<string>(`${start} - ${end} de ${total} itens`)

  setPaginationLabel?.({ start, end, total }, setLabel)

  return (
    <div className={className} {...rest}>
      <div className="flex items-center justify-center gap-2">
        <button
          className={buttonArrowVariants({ size })}
          onClick={() => handleChangePage("prev")}
          aria-label={`ir para a página ${currentPage - 1}`}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-angle-left"
            className={buttonArrowIconVariants({ size })}
          />
        </button>
        <span className="text-sm font-semibold text-neutral-700">
          {currentPage}
        </span>
        <button
          className={buttonArrowVariants({ size })}
          onClick={() => handleChangePage("next")}
          disabled={currentPage === pagination.totalPages || total < pageLimit}
          aria-label={`ir para a página ${currentPage + 1}`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-angle-right"
            className={buttonArrowIconVariants({ size })}
          />
        </button>
      </div>

      <div className="flex items-center justify-center">
        <span className={labelVariants({ size })}>{labelRef.current}</span>
      </div>
    </div>
  )
}
