import Button from "@atoms/Button"
import FontAwesomeIcon from "@atoms/FontAwesomeIcon"
import Hr from "@atoms/Hr"
import Input from "@atoms/Input"
import NavLink from "@atoms/NavLink"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function SignUp() {
  const {
    register,
    watch,
    formState: { errors, isValid },
    trigger,
    handleSubmit
  } = useForm<User & { passwordConfirmation: string }>({ mode: "onTouched" })
  const password = watch("password", "")
  const passwordConfirmation = watch("passwordConfirmation", "")

  const handleSubmitForm = (data: User) => {
    console.log(data)
  }

  const hasUppercase = (value: string) => /[A-Z]/.test(value)
  const hasLowerCase = (value: string) => /[a-z]/.test(value)
  const hasNumber = (value: string) => /[0-9]/.test(value)
  const hasSpecialChar = (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value)

  useEffect(() => {
    if (password && passwordConfirmation) trigger("passwordConfirmation")
  }, [password, passwordConfirmation, trigger])

  return (
    <form
      className="bg-white p-12 rounded-lg shadow-lg flex flex-col gap-4 items-center max-w-lg w-full"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <h1 className="text-2xl font-semibold text-gray-800">
        {/* TODO: pegar o nome da aplicação dinamicamente */}
        Bem-vindo ao Cursus
      </h1>

      <p className="text-sm text-gray-400 mb-8">
        Cadastre-se e comece a aprender!
      </p>

      <div className="w-full">
        <Input
          config={{
            icon: (
              <FontAwesomeIcon
                className="text-neutral-500"
                icon="fa-regular fa-circle-user"
              />
            )
          }}
          placeholder="Nome completo"
        />
        {errors.fullName && (
          <span className="text-xs text-red-500">
            {errors.fullName.message}
          </span>
        )}
      </div>

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
          type="password"
          {...register("password", {
            required: "Senha é obrigatória",
            minLength: {
              value: 8,
              message: "A senha deve ter pelo menos 8 caracteres"
            },
            validate: {
              hasUpperCase:
                hasUppercase || "Deve conter pelo menos uma letra maiúscula",
              hasLowerCase:
                hasLowerCase || "Deve conter pelo menos uma letra minúscula",
              hasNumber: hasNumber || "Deve conter pelo menos um número",
              hasSpecialChar:
                hasSpecialChar || "Deve conter pelo menos um caractere especial"
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
        {watch("password") && (
          <ul className="pl-3">
            <li className="text-neutral-600 text-xs">
              {hasUppercase(password) ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-check"
                  className="text-sm text-green-700"
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-xmark"
                  className="text-base text-red-500"
                />
              )}{" "}
              Caractere maiúsculo - [A-Z]
            </li>
            <li className="text-neutral-600 text-xs">
              {hasLowerCase(password) ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-check"
                  className="text-sm text-green-700"
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-xmark"
                  className="text-base text-red-500"
                />
              )}{" "}
              Caractere minúsculo [a-z]
            </li>
            <li className="text-neutral-600 text-xs">
              {hasNumber(password) ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-check"
                  className="text-sm text-green-700"
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-xmark"
                  className="text-base text-red-500"
                />
              )}{" "}
              Número - [0-9]
            </li>
            <li className="text-neutral-600 text-xs">
              {hasSpecialChar(password) ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-check"
                  className="text-sm text-green-700"
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-xmark"
                  className="text-base text-red-500"
                />
              )}{" "}
              Caractere especial - {`[!@#$%^&*(),.?":{}|<>]`}
            </li>
            <li className="text-neutral-600 text-xs">
              {password.length >= 8 ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-check"
                  className="text-sm text-green-700"
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-xmark"
                  className="text-base text-red-500"
                />
              )}{" "}
              Mínimo 8 caracteres - {password.length} de 8
            </li>
          </ul>
        )}
      </div>

      <div className="w-full">
        <Input
          type="password"
          {...register("passwordConfirmation", {
            required: "Confirmação de senha é obrigatória",
            validate: {
              matchPassword: (value) =>
                value === password || "As senhas não coincidem"
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
          placeholder="Confirmar de senha"
        />
        {errors.passwordConfirmation && (
          <span className="text-xs text-red-500">
            {errors.passwordConfirmation.message}
          </span>
        )}
      </div>

      <Button className="w-full mt-4" color="danger" disabled={!isValid}>
        Cadastrar
      </Button>

      <span className="text-sm text-neutral-500 mt-4">
        Ao se inscrever, você concorda com nossos{" "}
        <NavLink
          className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
          to={"/"}
        >
          Termos de Uso
        </NavLink>{" "}
        e{" "}
        <NavLink
          className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
          to={"/"}
        >
          Política de Privacidade
        </NavLink>
        .
      </span>

      <Hr className="my-4" />

      <span className="text-sm text-neutral-500">
        Já possui uma conta?{" "}
        <NavLink
          className="text-red-500 hover:text-gray-800 hover:underline transition duration-200"
          to={"/auth/sign-in"}
        >
          Faça Login
        </NavLink>
        .
      </span>
    </form>
  )
}
