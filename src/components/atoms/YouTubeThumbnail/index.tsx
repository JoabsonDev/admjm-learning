import { getYouTubeVideoId } from "@helpers/get-youtube-video-id"
import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({})

const Sizes = {
  default: "default",
  medium: "mqdefault",
  high: "hqdefault",
  standard: "sddefault",
  maxres: "maxresdefault"
} as const

type Video = {
  url?: string
  id?: string
}
type YouTubeThumbnailProps = Omit<ComponentProps<"img">, "src"> &
  VariantProps<typeof variants> & {
    video: Video
    size?: keyof typeof Sizes
  }

export default function YouTubeThumbnail({
  className,
  size = "medium",
  video,
  ...rest
}: YouTubeThumbnailProps) {
  className = variants({ className })

  const { url, id } = video

  const videoId = id || getYouTubeVideoId(url!)

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${Sizes[size]}.jpg`

  return (
    <img
      src={thumbnailUrl}
      alt={`Imagem miniatura do youtube baseado no id ${videoId}`}
      className={className}
      {...rest}
    />
  )
}
