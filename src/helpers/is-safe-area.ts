/**
 * Verifica se um elemento alvo está dentro de uma área segura definida por um elemento específico.
 *
 * A função percorre todos os elementos descendentes do elemento `safeArea` e verifica se o elemento `target`
 * está incluído nesse conjunto de elementos.
 *
 * @param target - O elemento HTML a ser verificado. Deve ser um objeto do tipo `HTMLElement`.
 * @param safeArea - O elemento que define a área segura. Deve ser um objeto do tipo `HTMLElement`.
 * @returns Um valor booleano indicando se o elemento `target` está dentro dos descendentes do `safeArea`.
 *          Retorna `true` se o `target` estiver dentro do `safeArea` ou dentro de seus descendentes.
 *          Caso contrário, retorna `false`.
 *
 */
export function isSafeArea(
  target: HTMLElement,
  safeArea: HTMLElement
): boolean {
  const elements = [...safeArea.getElementsByTagName("*")]

  return elements.includes(target)
}
