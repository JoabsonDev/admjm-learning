import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Hr from "@atoms/Hr"
import Input from "@atoms/Input"
import NavLink from "@atoms/NavLink"

export default function SignUp() {
  return (
    <form className="bg-white p-12 rounded-lg shadow-lg flex flex-col gap-4 items-center max-w-lg w-full">
      <h1 className="text-2xl font-semibold text-gray-800">
        Welcome to Cursus
      </h1>

      <p className="text-sm text-gray-400 mb-8">Sign Up and Start Learning!</p>

      <Input
        className="w-full"
        config={{
          icon: (
            <FontAwesomeIcon
              className="text-neutral-500"
              icon="fa-regular fa-envelope"
            />
          )
        }}
        placeholder="Full Name"
      />

      <Input
        className="w-full"
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

      <Input
        className="w-full"
        type="password"
        config={{
          icon: (
            <FontAwesomeIcon
              className="text-neutral-500"
              icon="fa-solid fa-key"
            />
          )
        }}
        placeholder="Password"
      />

      <Input
        className="w-full"
        type="password"
        config={{
          icon: (
            <FontAwesomeIcon
              className="text-neutral-500"
              icon="fa-solid fa-key"
            />
          )
        }}
        placeholder="Confirm Password"
      />

      <Button className="w-full mt-4" color="danger">
        Sign In
      </Button>

      <span className="text-sm text-neutral-500 mt-4">
        By signing up, you agree to our{" "}
        <NavLink
          className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
          to={"/"}
        >
          Terms of Use
        </NavLink>{" "}
        and{" "}
        <NavLink
          className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
          to={"/"}
        >
          Privacy Policy
        </NavLink>
        . .
      </span>

      <Hr className="my-4" />

      <span className="text-sm text-neutral-500">
        Already have an account?{" "}
        <NavLink
          className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
          to={"/auth/sign-in"}
        >
          Sign In
        </NavLink>
        .
      </span>
    </form>
  )
}
