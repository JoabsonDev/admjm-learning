import googleIcon from "@assets/google.png"
import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Hr from "@atoms/Hr"
import Input from "@atoms/Input"
import NavLink from "@atoms/NavLink"
import Toggle from "@atoms/Toggle"
import { authService } from "@services/auth"
import { useAlertStore } from "@store/alert"
import useAuthStore from "@store/auth"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Navigate } from "react-router-dom"

const { loginWithGoogle, login } = authService

export default function SignIn() {
  const { setUser, user } = useAuthStore()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<
    User & {
      rememberMe?: boolean
    }
  >({ mode: "onTouched" })

  const { addAlert } = useAlertStore()
  const loginMutation = useMutation({
    mutationFn: async (data: User) => {
      const userCredential = await login(data.email, data.password)
      setUser(userCredential.user)
    },
    onSuccess: () => {
      addAlert("Login efetuado com sucesso!", "success")
    },
    onError: (error) => {
      console.log("opa!", error)

      addAlert(
        "Não foi possível realizar o login. Verifique se os dados foram inseridos corretamente!",
        "error"
      )
    }
  })

  // TODO: pegar o UID do usuário para gerar a tabela user
  const googleLoginMutation = useMutation({
    mutationFn: () => loginWithGoogle(),
    onSuccess: () => {
      addAlert("Login com Google efetuado com sucesso!", "success")
    },
    onError: () => {
      addAlert(`Erro ao autenticar com Google!`, "error")
    }
  })

  const handleSubmitForm = (data: User) => {
    loginMutation.mutate(data)
  }

  const handleGoogleLogin = () => {
    googleLoginMutation.mutate()
  }

  if (user) return <Navigate to="/" />

  return (
    <div className="bg-white p-12 rounded-lg shadow-lg flex flex-col items-center gap-4 max-w-lg w-full">
      <h1 className="text-2xl font-semibold text-gray-800">Bem-vindo!</h1>
      <p className="text-sm text-gray-400 mb-8">
        {/* TODO: pegar o nome da aplicação dinamicamente */}
        Entre na sua conta do Cursus!
      </p>
      <button
        className="flex items-center justify-center gap-2 w-full h-[38px] px-4 py-2 rounded border border-gray-300 font-medium text-sm hover:border-blue-500 transition duration-200"
        onClick={handleGoogleLogin}
      >
        <img src={googleIcon} alt="ícone do google" className="w-5 h-5" />
        <span>Continue com o Google</span>
      </button>
      <div className="flex items-center justify-center gap-4 w-full my-6">
        <Hr />
        <span className="text-sm font-medium text-neutral-700">ou</span>
        <Hr />
      </div>
      <form
        className="flex flex-col items-center gap-4 w-full"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className="w-full">
          <Input
            type="email"
            {...register("email", {
              required: "O email é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de email inválido"
              }
            })}
            config={{
              icon: (
                <FontAwesomeIcon
                  className="text-neutral-500"
                  icon="fa-regular fa-envelope"
                />
              )
            }}
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="w-full">
          <Input
            className="w-full"
            type="password"
            {...register("password", {
              required: "A senha é obrigatória",
              minLength: {
                value: 8,
                message: "A senha deve ter pelo menos 8 caracteres"
              }
            })}
            config={{
              icon: (
                <FontAwesomeIcon
                  className="text-neutral-500"
                  icon="fa-solid fa-key"
                />
              )
            }}
            placeholder="Senha"
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <Toggle
          className="self-start"
          type="checkbox"
          label="Lembrar de mim"
          accentColor="danger"
          {...register("rememberMe")}
        />

        <Button className="w-full mt-4" color="danger" disabled={!isValid}>
          Entrar
        </Button>

        <span className="text-sm text-neutral-500 mt-4">
          Ou{" "}
          <NavLink
            className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
            to={"/auth/forgot-password"}
          >
            esqueceu sua senha
          </NavLink>
          .
        </span>

        <Hr className="my-4" />

        <span className="text-sm text-neutral-500">
          Não tem uma conta?{" "}
          <NavLink
            className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
            to={"/auth/sign-up"}
          >
            Cadastre-se
          </NavLink>
          .
        </span>
      </form>
    </div>
  )
}
