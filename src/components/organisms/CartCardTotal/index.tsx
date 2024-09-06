import Button from "@atoms/Button"
import Hr from "@atoms/Hr"
import Input from "@atoms/Input"
import { formateCurrency } from "@helpers/formate-currency"
import axios from "axios"
import { ComponentProps } from "react"
import { useMutation, useQueryClient } from "react-query"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "flex flex-col bg-white rounded-md p-4 pb-10 border border-neutral-200 max-w-full lg:max-w-96 w-full self-start"
})
type CartCardTotalProps = ComponentProps<"div"> &
  VariantProps<typeof variants> & {}

export default function CartCardTotal({
  className,
  ...rest
}: CartCardTotalProps) {
  className = variants({ className })

  const queryClient = useQueryClient()

  const cartCourses = queryClient.getQueryData<Course[]>(["cart-courses"])

  const total = cartCourses?.reduce((acc, course) => {
    return acc + (course.price ?? 0)
  }, 0)
  // TODO: Implementar desconto
  const discount = 0

  // TODO: consultar https://www.mercadopago.com.br/developers/pt/reference/preferences/_checkout_preferences/post para maiores detalhes
  const createPreferenceMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "https://api.mercadopago.com/checkout/preferences",
        {
          items: cartCourses?.map((course) => ({
            id: course.id,
            title: course.title,
            description: course.description,
            unit_price: course.price,
            quantity: 1,
            picture_url: course.thumbnail?.ref, // Supondo que exista um campo imageUrl no objeto course,
            currency_id: "BRL"
          })),
          // TODO: Criar urls de retorno
          back_urls: {
            success: `${window.location.origin}?success`,
            failure: `${window.location.origin}?failure`,
            pending: `${window.location.origin}?pending`
          },
          auto_return: "approved",
          payment_methods: {
            installments: 1
          },
          // TODO: implementar o endpoint de notificação
          notification_url: "https://www.notificacao.com.br"
        },
        {
          headers: {
            Authorization: `Bearer APP_USR-286691588459706-090520-d3ed793dfb3ea9b36c520365cb230f71-1978843226`,
            "Content-Type": "application/json"
          }
        }
      )
      return response.data
    },
    onSuccess: (data) => {
      // Redireciona o usuário para o URL de checkout retornado pelo Mercado Pago
      window.location.href = data.init_point
    },
    onError: (error) => {
      console.error("Erro ao criar preferência de pagamento:", error)
      // Lógica para tratar o erro (exibir alerta, etc.)
    }
  })

  return (
    <div className={className} {...rest}>
      <span className="text-lg font-medium text-neutral-700 mb-2.5">Total</span>
      <Hr className="border-t-2 border-red-500 w-[50px]" />

      <div className="flex items-center justify-between mt-8 mb-5 font-semibold text-sm">
        <span className="text-neutral-600">Preço original</span>
        <span className="text-neutral-500">
          {formateCurrency({
            value: total!
          })}
        </span>
      </div>
      <Hr />

      <div className="flex items-center justify-between my-5 font-semibold text-sm">
        <span className="text-neutral-600">Desconto</span>
        <span className="text-neutral-500">
          {formateCurrency({
            value: discount!
          })}
        </span>
      </div>
      <Hr />

      <div className="flex items-center justify-between my-5 font-semibold text-lg">
        <span className="text-neutral-700">Total</span>
        <span className="text-neutral-600">
          {formateCurrency({
            value: total! - discount!
          })}
        </span>
      </div>
      <Hr />

      <div>
        <div className="mt-5">
          <label
            className="text-sm text-neutral-700 font-medium mb-1.5 block"
            htmlFor="title"
          >
            Cupom de desconto
          </label>
          <div className="flex">
            <Input
              id="discount"
              placeholder="Cupom de desconto"
              className="h-9 flex-1 rounded-tr-none rounded-br-none"
              // {...register("title", {
              //   required: "O título é obrigatório"
              // })}
              // disabled={readonly}
            />
            <Button color="danger" className="rounded-tl-none rounded-bl-none">
              Aplicar
            </Button>
          </div>
          {/* {errors.title && (
              <span className="text-xs text-red-500">
                {errors.title.message}
              </span>
            )} */}
        </div>

        <Button
          color="danger"
          className="mt-10 w-full"
          onClick={() => createPreferenceMutation.mutate()}
        >
          Finalizar compra
        </Button>
      </div>
    </div>
  )
}
