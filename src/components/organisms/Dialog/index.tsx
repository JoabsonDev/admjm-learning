import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { ComponentProps, useCallback, useEffect, useRef } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "backdrop:bg-black/10 backdrop-filter-blur bg-transparent max-w-xl w-full overflow-hidden"
})

type DialogProps = Omit<ComponentProps<"dialog">, "aria-labelledby"> &
  VariantProps<typeof variants> & {
    open?: boolean
  }

// TODO: criar transições entre outras propriedades do dialog
export default function Dialog({
  className,
  title,
  open,
  children,
  ...rest
}: DialogProps) {
  className = variants({ className })

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleClose = useCallback(() => {
    if (!dialogRef.current) return

    dialogRef.current.close()
    document.body.classList.remove("overflow-hidden")
  }, [])

  useEffect(() => {
    if (!dialogRef.current) return

    const currentDialogRef = dialogRef.current

    if (open) {
      currentDialogRef.showModal()
      document.body.classList.add("overflow-hidden")
    } else {
      handleClose()
    }

    const handleBackdropClick = (event: MouseEvent) => {
      if (!currentDialogRef) return

      const rect = currentDialogRef.getBoundingClientRect()

      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        handleClose()
      }
    }

    currentDialogRef.addEventListener("click", handleBackdropClick)

    return () => {
      currentDialogRef.removeEventListener("click", handleBackdropClick)
    }
  }, [handleClose, open])

  return (
    <dialog
      ref={dialogRef}
      className={className}
      {...rest}
      aria-labelledby={title ? "title" : undefined}
    >
      <div className="rounded-lg overflow-hidden bg-white mx-4 relative">
        <div className="border-b px-4 pt-4 pb-3  border-neutral-200">
          {title && (
            <h2 id="title" className="font-semibold text-neutral-700">
              {title}
            </h2>
          )}
          <button
            className="absolute right-1 top-1 px-1.5 hover:text-red-500 focus-visible:text-red-500 transition duration-200 text-lg"
            onClick={handleClose}
            aria-label="fechar modal"
          >
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </dialog>
  )
}
