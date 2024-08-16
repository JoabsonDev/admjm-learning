import { shortName } from "@helpers/short-name"
import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex items-center justify-center rounded-full aspect-square bg-neutral-300",
  variants: {
    size: {
      sm: "w-8",
      md: "w-10",
      lg: "w-12"
    }
  }
})
type AvatarProps = ComponentProps<"img"> &
  VariantProps<typeof variants> & {
    name?: string
  }

export default function Avatar({
  className,
  src,
  name,
  size = "sm",
  ...rest
}: AvatarProps) {
  className = variants({ size, className })

  return (
    <div className={className} {...rest}>
      {!src && name && (
        <span className="text-sm font-semibold text-gray-800">
          {shortName(name)}
        </span>
      )}
      {src && <img src={src} alt={name} />}
    </div>
  )
}
