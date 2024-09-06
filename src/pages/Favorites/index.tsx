import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import NavLink from "@atoms/NavLink"

export default function Favorites() {
  return (
    <div className="pt-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center text-lg font-medium text-neutral-700">
          <FontAwesomeIcon icon="fa-solid fa-heart" className="text-md w-6" />{" "}
          Favoritos
        </h1>

        <NavLink
          to={`/`}
          className="flex items-center gap-1 text-neutral-600 hover:text-neutral-700 transition duration-200"
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-left" />
          voltar
        </NavLink>
      </div>
    </div>
  )
}
