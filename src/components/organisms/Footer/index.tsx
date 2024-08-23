import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "px-4 bg-neutral-800 text-white flex"
})
type FooterProps = ComponentProps<"footer"> & VariantProps<typeof variants> & {}

export default function Footer({ className, ...rest }: FooterProps) {
  className = variants({ className })

  // TODO: mover para um arquivo de constantes, criar type e talvez usar um dotenv
  const socialMedias = [
    {
      icon: "fa-brands fa-facebook-f",
      link: "https://facebook.com"
    },
    {
      icon: "fa-brands fa-twitter",
      link: "https://twitter.com"
    },
    {
      icon: "fa-brands fa-google-plus-g",
      link: "https://google.com"
    },
    {
      icon: "fa-brands fa-linkedin-in",
      link: "https://linkedin.com"
    },
    {
      icon: "fa-brands fa-instagram",
      link: "https://instagram.com"
    },
    {
      icon: "fa-brands fa-youtube",
      link: "https://youtube.com"
    },
    {
      icon: "fa-brands fa-pinterest-p",
      link: "https://br.pinterest.com/"
    }
  ]

  return (
    <footer className={className} {...rest}>
      <div className="mx-auto max-w-screen-xl w-full flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="text-sm flex items-center py-5 justify-center md:justify-start w-full flex-1 basis-72 text-nowrap md:grow-0">
            <img
              className="mr-4 w-8"
              src="https://gambolthemes.net/html-items/cursus-new-demo/images/logo1.svg"
              alt=""
            />
            © 2024 <strong className="ml-1">Cursus</strong>. All Rights
            Reserved.
          </span>

          <ul className="flex gap-2 justify-center md:justify-start w-full flex-1 md:grow-0">
            {socialMedias.map((socialMedia) => (
              <li key={socialMedia.icon}>
                <a href={socialMedia.link}>
                  <FontAwesomeIcon
                    icon={socialMedia.icon}
                    className="p-1 hover:scale-110 transition duration-200 text-md"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
