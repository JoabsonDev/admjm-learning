type CourseRangeReturn = { start: number; end: number }

/**
 * Calcula o intervalo de cursos que deve ser exibido na página atual com base na paginação fornecida.
 *
 * @param {Pagination} pagination - Um objeto contendo os parâmetros de paginação.
 * @param {number} pagination.currentPage - A página atual que o usuário está visualizando.
 * @param {number} pagination.total - O número total de cursos disponíveis.
 * @param {number} pagination.pageSize - O número máximo de cursos exibidos por página.
 * @returns {CourseRangeReturn} Um objeto contendo o índice inicial e final dos cursos exibidos na página atual.
 *
 * @example
 * // Com paginação na página 1, exibindo até 15 cursos de um total de 23
 * const pagination = { currentPage: 1, total: 23, pageSize: 15 };
 * const range = getCourseRange(pagination);
 * // Retorno: { start: 1, end: 15 }
 *
 * @example
 * // Com paginação na página 2, exibindo até 15 cursos de um total de 23
 * const pagination = { currentPage: 2, total: 23, pageSize: 15 };
 * const range = getCourseRange(pagination);
 * // Retorno: { start: 16, end: 23 }
 */
export function getCourseRange(pagination: Pagination): CourseRangeReturn {
  const { currentPage, total, pageSize } = pagination
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(start + pageSize - 1, total)

  return { start, end }
}
