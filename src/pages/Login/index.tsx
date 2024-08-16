import { NavLink } from "react-router-dom"
import Button from "../../components/atoms/Button"
import FontAwesomeIcon from "../../components/atoms/FontAwesomeIcon"
import Hr from "../../components/atoms/Hr"
import Input from "../../components/atoms/Input"
import Toggle from "../../components/atoms/Toggle"

export default function Login() {
  return (
    <main className="h-screen bg-neutral-100 flex flex-col items-center justify-center p-4">
      <form className="bg-white p-12 rounded-lg shadow-lg flex flex-col gap-4 items-center max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>

        <p className="text-sm text-gray-400 mb-8">
          Log In to Your Cursus Account!
        </p>

        <Input
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
            to={"/forgot-password"}
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
            to={"/forgot-password"}
          >
            Sign Up
          </NavLink>
          .
        </span>
      </form>

      <footer className="text-sm mt-12 flex items-center gap-2">
        <img
          src="https://gambolthemes.net/html-items/cursus-new-demo/images/sign_logo.png"
          alt=""
        />
        © 2024 <strong>Cursus</strong>. All Rights Reserved.
      </footer>
    </main>
  )
}
