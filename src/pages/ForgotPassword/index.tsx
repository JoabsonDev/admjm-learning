import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Input from "@atoms/Input"
import NavLink from "@atoms/NavLink"
import { authService } from "@services/auth"
import { useAlertStore } from "@store/alert"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

type User = {
  email: string
}

export default function ForgotPassword() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<User>({ mode: "onTouched" })

  const { addAlert } = useAlertStore()
  const navigate = useNavigate()

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authService.resetPassword(email),
    onSuccess: () => {
      addAlert("E-mail de redefinição enviado com sucesso!", "success")
      navigate("/auth/sign-in")
    },
    onError: () => {
      addAlert(
        `Erro ao enviar o e-mail de redefinição. Tente novamente!`,
        "error"
      )
    }
  })

  const handleSubmitForm = (data: User) => {
    forgotPasswordMutation.mutate(data.email)
  }

  return (
    <form
      className="bg-white p-12 rounded-lg shadow-lg flex flex-col gap-4 items-center max-w-lg w-full"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Solicitar uma redefinição de senha
      </h1>

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

      <Button className="w-full mt-4" color="danger" disabled={!isValid}>
        Redefinir Senha
      </Button>

      <span className="text-sm text-neutral-500">
        Voltar para o{" "}
        <NavLink
          className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
          to={"/auth/sign-in"}
        >
          Login
        </NavLink>
      </span>
    </form>
  )
}
