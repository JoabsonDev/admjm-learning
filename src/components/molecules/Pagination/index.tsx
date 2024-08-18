import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { getCourseRange } from "@helpers/get-course-range"
import { getPaginationPages } from "@helpers/get-pagination-pages"
import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex flex-col items-center justify-center gap-2"
})
type PaginationProps = ComponentProps<"div"> &
  VariantProps<typeof variants> & {
    data: Pagination
    onPageChange?: (page: number) => void
  }

export default function Pagination({
  className,
  data,
  onPageChange,
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

  return (
    <div className={className} {...rest}>
      <div className="flex items-center justify-center gap-1 text-white">
        <Button
          onClick={() => handlePageChange(1)}
          className="bg-white text-neutral-700 hover:bg-neutral-700 hover:text-white py-1 px-2 h-8 aspect-square disabled:bg-neutral-300 disabled:text-white disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          aria-label={`ir para a página 1`}
        >
          <FontAwesomeIcon icon="fa-solid fa-angles-left" className="text-sm" />
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-white text-neutral-700 hover:bg-neutral-700 hover:text-white py-1 px-2 h-8 aspect-square disabled:bg-neutral-300 disabled:text-white disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          aria-label={`ir para a página ${currentPage - 1}`}
        >
          <FontAwesomeIcon icon="fa-solid fa-angle-left" className="text-sm" />
        </Button>
        {getPaginationPages(currentPage, totalPages).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`hover:bg-neutral-700 hover:text-white py-1 px-2 h-8 aspect-square font-semibold text-neutral-700 ${
              page === currentPage ? "bg-neutral-700 text-white" : "bg-white"
            }`}
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
          className="bg-white text-neutral-700 hover:bg-neutral-700 hover:text-white py-1 px-2 h-8 aspect-square disabled:bg-neutral-300 disabled:text-white disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          aria-label={`ir para a página ${currentPage + 1}`}
        >
          <FontAwesomeIcon icon="fa-solid fa-angle-right" className="text-sm" />
        </Button>
        <Button
          onClick={() => handlePageChange(totalPages)}
          className="bg-white text-neutral-700 hover:bg-neutral-700 hover:text-white py-1 px-2 h-8 aspect-square disabled:bg-neutral-300 disabled:text-white disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          aria-label={`ir para a página ${totalPages}`}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-angles-right"
            className="text-sm"
          />
        </Button>
      </div>

      <span className="text-neutral-500 text-sm">
        {start}-{end} de {total} cursos
      </span>
    </div>
  )
}
