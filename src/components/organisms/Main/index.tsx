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
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
      <p className="mb-48">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        aspernatur corrupti quae obcaecati qui eum, quos numquam omnis, odio
        pariatur quibusdam officia quasi blanditiis amet, ratione ex aliquam
        incidunt iste.
      </p>
    </main>
  )
}
