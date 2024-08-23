/**
 * Cria uma string de parâmetros de consulta (query string) a partir de um objeto.
 *
 * @param params - Um objeto onde as chaves são strings e os valores podem ser strings, números, booleanos, null ou arrays de strings, números ou booleanos.
 * @returns Uma string de parâmetros de consulta (query string), no formato `key=value`, onde múltiplos valores para a mesma chave são representados por múltiplos pares `key=value`.
 *
 * @example
 * ```typescript
 * const params = {
 *   page: 1,
 *   search: "javascript",
 *   sort: "asc",
 *   tags: ["react", "typescript"]
 * };
 *
 * const queryString = createQueryParams(params);
 * console.log(queryString); // "page=1&search=javascript&sort=asc&tags=react&tags=typescript"
 * ```
 */
export function createQueryParams(
  params: Record<
    string,
    string | number | boolean | null | (string | number | boolean)[]
  >
): string {
  const searchParams = new URLSearchParams()
  const hasOwnProperty = Object.prototype.hasOwnProperty

  for (const key in params) {
    if (hasOwnProperty.call(params, key)) {
      const value = params[key]

      if (!value) continue

      if (Array.isArray(value)) {
        value.forEach((val) => searchParams.append(key, String(val)))
      } else {
        searchParams.append(key, String(value))
      }
    }
  }

  return searchParams.toString()
}
