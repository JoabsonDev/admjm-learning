import Button from "../../components/atoms/Button"
import FontAwesomeIcon from "../../components/atoms/FontAwesomeIcon"
import Input from "../../components/atoms/Input"
import NavLink from "../../components/atoms/NavLink"

export default function ForgotPassword() {
  return (
    <form className="bg-white p-12 rounded-lg shadow-lg flex flex-col gap-4 items-center max-w-lg w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Request a Password Reset
      </h1>

      <Input
        type="email"
        config={{
          icon: (
            <FontAwesomeIcon
              className="text-neutral-500"
              icon="fa-regular fa-envelope"
            />
          )
        }}
        placeholder="Email Address"
      />

      <Button className="w-full mt-4">Reset Password</Button>

      <span className="text-sm text-neutral-500">
        Go Back{" "}
        <NavLink
          className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
          to={"/auth/sign-in"}
        >
          Sign In
        </NavLink>
      </span>
    </form>
  )
}
