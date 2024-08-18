/**
 * Gera um array de números de página para exibir na paginação.
 *
 * Essa função cria um array de páginas com no máximo 5 elementos, centralizando a página atual
 * sempre que possível. Se `currentPage` estiver perto do início ou do fim, o array se ajusta
 * para mostrar as páginas iniciais ou finais.
 *
 * @param currentPage - A página atual que o usuário está visualizando.
 *                      Deve ser um número inteiro entre 1 e `totalPages`.
 * @param totalPages - O número total de páginas disponíveis.
 *                     Deve ser um número inteiro positivo.
 * @returns Um array de números de página para exibição na interface de paginação.
 *
 * @example
 * // Exemplo 1: Página inicial (1) de um total de 10 páginas
 * getPaginationPages(1, 10);
 * // Retorno: [1, 2, 3, 4, 5]
 *
 * @example
 * // Exemplo 2: Página intermediária (6) de um total de 10 páginas
 * getPaginationPages(6, 10);
 * // Retorno: [4, 5, 6, 7, 8]
 *
 * @example
 * // Exemplo 3: Última página (10) de um total de 10 páginas
 * getPaginationPages(10, 10);
 * // Retorno: [6, 7, 8, 9, 10]
 */
export function getPaginationPages(
  currentPage: number,
  totalPages: number
): number[] {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  let start = Math.max(0, currentPage - 3)
  const end = Math.min(start + 5, totalPages)

  if (end - start < 5) {
    start = Math.max(0, end - 5)
  }

  return pages.slice(start, end)
}
