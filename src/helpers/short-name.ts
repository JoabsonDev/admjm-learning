/**
 * Retorna as iniciais do nome, como "JS" para "Joabson Silva".
 * @param name O nome completo ou parcial.
 * @returns As iniciais do nome, como "JS" ou "JO".
 */
export function shortName(name: string): string {
  const upperCaseName = [...name].reduce((acc, letter) => {
    acc += letter.toUpperCase()
    return acc
  }, "")

  const splittedName = upperCaseName.split(" ")
  if (splittedName.length === 1) return splittedName[0].slice(0, 2)

  const firstName = splittedName[0]
  const lastName = splittedName[splittedName.length - 1]

  return `${firstName[0]}${lastName[0]}`
}
