// Item - Produto ou serviço para ser cobrado
interface Item {
  id: string
  title: string
  description?: string
  category_id?: string
  quantity: number
  unit_price: number
  currency_id?: string // Exemplo: 'BRL'
  picture_url?: string
}

// Payer - Informações do comprador
interface Payer {
  name: string
  surname: string
  email: string
  phone?: {
    area_code: string
    number: string
  }
  identification?: {
    type: string // Tipo de documento, ex: "CPF", "DNI"
    number: string
  }
  address?: {
    street_name: string
    street_number: number
    zip_code: string
  }
}

// BackUrls - URLs de retorno
interface BackUrls {
  success: string
  failure: string
  pending: string
}

// PaymentMethods - Métodos de pagamento
interface PaymentMethods {
  excluded_payment_methods?: { id: string }[]
  excluded_payment_types?: { id: string }[]
  installments?: number // Número máximo de parcelas
}

// Preference - A preferência de pagamento completa
interface Preference {
  items: Item[]
  payer: Payer
  back_urls: BackUrls
  auto_return?: "approved" | "all"
  payment_methods?: PaymentMethods
  notification_url?: string
  statement_descriptor?: string
  external_reference?: string
  expires?: boolean
  expiration_date_from?: string
  expiration_date_to?: string
}

interface PreferenceResponse {
  id: string
  init_point: string // URL para redirecionar o usuário ao checkout
  sandbox_init_point: string // URL para ambiente de testes (sandbox)
  date_created: string // Data de criação da preferência
  items: Item[]
  payer?: Payer
  payment_methods: PaymentMethods
  back_urls: BackUrls
  auto_return: string // 'approved'
  notification_url: string
  external_reference: string
  expires: boolean
  expiration_date_from?: string
  expiration_date_to?: string
}
