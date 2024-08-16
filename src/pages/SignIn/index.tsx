import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Hr from "@atoms/Hr"
import Input from "@atoms/Input"
import NavLink from "@atoms/NavLink"
import Toggle from "@atoms/Toggle"

export default function SignIn() {
  return (
    <form className="bg-white p-12 rounded-lg shadow-lg flex flex-col gap-4 items-center max-w-lg w-full">
      <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>

      <p className="text-sm text-gray-400 mb-8">
        Log In to Your Cursus Account!
      </p>

      <Input
        className="w-full"
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

      <Toggle
        className="self-start"
        type="checkbox"
        label="Remember me"
        accentColor="danger"
      />

      <Button className="w-full mt-4">Sign In</Button>

      <span className="text-sm text-neutral-500 mt-4">
        Or{" "}
        <NavLink
          className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
          to={"/auth/forgot-password"}
        >
          Forgot Password
        </NavLink>
        .
      </span>

      <Hr className="my-4" />

      <span className="text-sm text-neutral-500">
        Don't have an account?{" "}
        <NavLink
          className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
          to={"/auth/sign-up"}
        >
          Sign Up
        </NavLink>
        .
      </span>
    </form>
  )
}
