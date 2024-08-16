import Avatar from "@atoms/Avatar"
import Badge from "@atoms/Badge"
import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import NavLink from "@atoms/NavLink"
import Search from "@atoms/Search"

export default function Home() {
  return (
    <>
      <header className="fixed z-10 w-full h-16 py-4 pr-4 flex items-center bg-white shadow">
        <div className="h-full w-60 pl-4">
          <NavLink to={"/"} aria-label="ir para início">
            <img
              className="h-full"
              src="https://gambolthemes.net/html-items/cursus-new-demo/images/logo.svg"
              alt="Logotipo"
            />
          </NavLink>
        </div>
        <Search
          className="w-80"
          placeholder="Search for Tuts Videos, Tutors, Tests and more.."
        />

        <nav className="ml-auto">
          <ul className="flex items-center gap-2">
            <li>
              <Button className="px-2 py-0 text-neutral-500 hover:text-gray-800 focus:text-gray-800  hover:bg-gray-100 focus:bg-gray-100">
                <FontAwesomeIcon icon="fa-solid fa-bars" />
              </Button>
            </li>
            <li>
              <Button className="relative px-2 py-0 text-neutral-500 hover:text-gray-800 focus:text-gray-800 outline-none">
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                <Badge className="absolute right-0 -top-[3px]">1</Badge>
              </Button>
            </li>
            <li>
              <Button className="relative px-2 py-0 text-neutral-500 hover:text-gray-800 focus:text-gray-800 outline-none">
                <FontAwesomeIcon icon="fa-solid fa-bell" />
                <Badge className="absolute right-0 -top-[3px]">3</Badge>
              </Button>
            </li>
            <li>
              <Button className="p-0">
                <Avatar
                  className="border border-white shadow-md overflow-hidden"
                  src="https://gambolthemes.net/html-items/cursus-new-demo/images/left-imgs/img-10.jpg"
                  name="Joabson Firmo da Silva"
                />
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <aside className="fixed z-10 w-60 bg-white left-0 top-16 bottom-0">
        aside
      </aside>
      <main className="pt-24 ml-60 p-4">
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
      <footer>footer</footer>
    </>
  )
}
