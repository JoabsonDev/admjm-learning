import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import NavLink from "@atoms/NavLink"
import Stars from "@atoms/Stars"
import { ToggleAsideContext } from "@contexts/ToggleAsideProvider/ToggleAside.context"
import { ComponentProps, useContext } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "pt-24 pb-4 px-4 transition-all duration-300",
  variants: {
    hasAside: {
      true: "sm:ml-60"
    }
  }
})
type MainProps = ComponentProps<"main"> & VariantProps<typeof variants> & {}

export default function Main({ className, ...rest }: MainProps) {
  const { isVisible } = useContext(ToggleAsideContext)
  className = variants({ hasAside: isVisible, className })

  return (
    <main className={className} {...rest}>
      <h2 className="mb-5 text-lg font-medium text-neutral-700">
        Continuar curso
      </h2>

      <div className="p-2.5 bg-white rounded-sm border border-neutral-200 max-w-sm">
        <NavLink to={"/"} className="relative">
          <img
            className="w-full"
            src="https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-1.jpg"
            alt=""
          />
          <div className="group absolute inset-0 bg-gradient-to-b from-transparent to-neutral-700/35">
            <FontAwesomeIcon
              icon="fa-solid fa-play"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full grid place-items-center bg-neutral-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="absolute right-2.5 bottom-2.5 py-1 px-2.5 rounded bg-neutral-900/70 text-white text-xs font-medium">
              25 hours
            </span>
          </div>
        </NavLink>

        <div className="px-1 py-2.5">
          <Stars size={3.5} />
        </div>
      </div>
    </main>
  )
}
