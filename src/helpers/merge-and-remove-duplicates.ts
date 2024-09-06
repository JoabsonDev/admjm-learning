/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Remove duplicatas de um array de objetos com base em uma propriedade única.
 *
 * @param {T[]} array - O array de objetos do qual as duplicatas serão removidas.
 * @param {keyof T} uniqueKey - A chave usada para identificar duplicatas.
 * @returns {T[]} Um novo array contendo apenas objetos únicos.
 *
 * @template T - Tipo dos objetos no array. Deve ter a propriedade `uniqueKey`.
 */
export function removeDuplicates<T extends Record<string, any>>(
  array: T[],
  uniqueKey: keyof T
): T[] {
  // Filtrar objetos únicos com base na propriedade fornecida
  const uniqueArray = array.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t[uniqueKey] === value[uniqueKey])
  )

  return uniqueArray
}
