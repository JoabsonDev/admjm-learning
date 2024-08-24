import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "relative h-3 bg-gray-200 rounded-lg overflow-hidden"
})

type ProgressBarProps = ComponentProps<"div"> &
  VariantProps<typeof variants> & {
    progress: number
  }

export default function ProgressBar({
  className,
  progress,
  ...rest
}: ProgressBarProps) {
  className = variants({ className })

  return (
    <div className={className} {...rest}>
      <div
        className="absolute top-0 left-0 h-full bg-blue-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}
