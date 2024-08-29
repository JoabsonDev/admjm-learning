import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import ProgressBar from "@atoms/ProgressBar"
import { ComponentProps, forwardRef, useEffect, useState } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex flex-col items-center justify-center relative border-2 border-dashed border-neutral-300 outline-none h-72 max-w-[500px] w-full cursor-pointer hover:border-blue-600 focus-visible:border-blue-600 has-[:focus-visible]:border-neutral-500 has-[:disabled]:cursor-not-allowed has-[:disabled]:hover:border-neutral-300 transition duration-200"
})
type ImageUploaderProps = ComponentProps<"input"> &
  Partial<ComponentProps<typeof ProgressBar>> &
  VariantProps<typeof variants> & { thumbnail?: string | null }

export default forwardRef<HTMLInputElement, ImageUploaderProps>(
  function ImageUploader(
    {
      className,
      id,
      placeholder,
      progress,
      thumbnail,
      ...rest
    }: ImageUploaderProps,
    ref
  ) {
    className = variants({ className })

    const [image, setImage] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string>("No Selected File")

    const handleSetFiles = (localRef: HTMLInputElement) => {
      const files = localRef.files
      if (!files || files?.length === 0) return

      setFileName(files[0].name)
      setImage(URL.createObjectURL(files[0]))
    }

    useEffect(() => {
      if (thumbnail) setImage(thumbnail)
    }, [thumbnail])

    return (
      <>
        <div
          tabIndex={0}
          role="input"
          className={className}
          onClick={(event) => {
            const localRef = event.currentTarget.querySelector("input")
            localRef?.removeEventListener("change", () =>
              handleSetFiles(localRef)
            )
            localRef?.addEventListener("change", () => handleSetFiles(localRef))
            localRef?.click()
          }}
          aria-label={placeholder}
        >
          {image && (
            <button
              type="button"
              className="px-1 py-0 -right-5 -top-6 absolute disabled:cursor-not-allowed hover:scale-105"
              disabled={rest.disabled}
              onClick={(event) => {
                event.stopPropagation()
                setImage(null)
                setFileName("No Selected File")
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" className="" />
            </button>
          )}

          <input
            ref={ref}
            type="file"
            accept="image/*"
            id={id}
            hidden
            aria-hidden={true}
            {...rest}
          />

          {image ? (
            <img
              src={image}
              alt={fileName}
              className="w-full h-full object-contain"
            />
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-cloud-arrow-up"
              className="text-[60px] text-blue-600"
            />
          )}
        </div>

        {!!progress && progress < 100 && (
          <ProgressBar progress={progress} className="mt-2 max-w-[500px]" />
        )}
      </>
    )
  }
)
