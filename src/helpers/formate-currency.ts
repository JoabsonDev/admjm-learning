type FormateCurrencyProps = {
  value: number
  locale?: string
  options?: Intl.NumberFormatOptions
}
const DEFAULT_OPTIONS = {
  style: "currency",
  currency: "BRL"
}

/**
 * Formata um valor numérico como uma moeda de acordo com as convenções da localidade e opções especificadas.
 *
 * @param {number} value - O valor numérico a ser formatado como moeda.
 * @param {string} [locale="pt-BR"] - A localidade (locale) a ser utilizada para formatar o número.
 * @param {Intl.NumberFormatOptions} [options] - As opções para personalizar o formato da moeda.
 * As opções fornecidas serão mescladas com as opções padrão (DEFAULT_OPTIONS).
 *
 * @returns {string} Uma string representando o valor numérico formatado como moeda.
 *
 * @example
 * // Formata o valor como Real Brasileiro (BRL)
 * const valorFormatado = formateCurrency({ value: 1234.56 });
 * // Saída: "R$ 1.234,56"
 *
 * @example
 * // Formata o valor como Dólar Americano (USD)
 * const valorEmDolar = formateCurrency({
 *   value: 1234.56,
 *   locale: "en-US",
 *   options: { currency: "USD" }
 * });
 * // Saída: "$1,234.56"
 *
 * @example
 * // Formata o valor como Yen Japonês (JPY)
 * const valorPersonalizado = formateCurrency({
 *   value: 1234.56,
 *   locale: "ja-JP",
 *   options: { currency: "JPY" }
 * });
 * // Saída: "￥1,235" (sem casas decimais)
 */
export function formateCurrency({
  value = 0,
  locale = "pt-BR",
  options
}: FormateCurrencyProps) {
  options = { ...DEFAULT_OPTIONS, ...options } as Intl.NumberFormatOptions

  return value.toLocaleString(locale, options)
}
