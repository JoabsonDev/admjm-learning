type FormateCurrencyProps = {
  value: number
  locale?: string
  options?: Intl.NumberFormatOptions
}
const DEFAULT_OPTIONS = {
  style: "currency",
  currency: "BRL"
}
export function formateCurrency({
  value = 0,
  locale = "pt-BR",
  options
}: FormateCurrencyProps) {
  console.log(locale)

  options = { ...DEFAULT_OPTIONS, ...options } as Intl.NumberFormatOptions

  return value.toLocaleString(locale, options)
}
