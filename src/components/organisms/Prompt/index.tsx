import Button from "@atoms/Button"
import Dialog from "@organisms/Dialog"
import { ComponentProps, useState } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({})

type PromptProps = ComponentProps<typeof Dialog> &
  VariantProps<typeof variants> & {
    show: boolean
    title?: string
    message?: string
    onCancel?: () => void
    onConfirm?: () => void
  }

export default function Prompt({
  className,
  title,
  message,
  show,
  onCancel,
  onConfirm,
  ...rest
}: PromptProps) {
  className = variants({ className })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Dialog
      title={title}
      open={show}
      className={className}
      {...rest}
      hasCloseButton={false}
      onClose={() => setIsLoading(false)}
    >
      <p className="text-sm text-neutral-600 mb-10">{message}</p>

      <div className="flex items-center justify-end gap-3">
        <Button
          className="bg-neutral-400 text-white hover:bg-neutral-500"
          onClick={onCancel}
        >
          cancelar
        </Button>
        <Button
          color="danger"
          onClick={() => {
            setIsLoading(true)
            onConfirm!()
          }}
          isLoading={isLoading}
        >
          ok
        </Button>
      </div>
    </Dialog>
  )
}
