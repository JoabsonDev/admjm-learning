/**
 * Calcula a duração total de todas as aulas.
 *
 * Esta função recebe um array de objetos de aula, cada um contendo uma string `duration`
 * no formato "HH:MM:SS" ou "MM:SS", e retorna a duração total formatada como uma string "HH:MM:SS" ou "MM:SS",
 * dependendo da necessidade.
 *
 * @param {Array<{ duration: string }>} lectures - Um array de objetos representando aulas, onde cada objeto contém uma string `duration`.
 * @returns {string} A duração total de todas as aulas formatada como "HH:MM:SS" ou "MM:SS".
 *
 * @example
 * const lectures = [
 *   { duration: "05:32" },
 *   { duration: "00:03" }
 * ];
 * const totalDuration = calculateTotalDuration(lectures);
 * console.log(totalDuration); // "05:35"
 *
 * const lecturesWithHours = [
 *   { duration: "01:05:32" },
 *   { duration: "00:03" }
 * ];
 * const totalDurationWithHours = calculateTotalDuration(lecturesWithHours);
 * console.log(totalDurationWithHours); // "01:05:35"
 */
export function calculateTotalDuration(
  lectures: { duration: string }[]
): string {
  const total = lectures.reduce((acc, lecture) => {
    const parts = lecture.duration.split(":").map(Number)

    let seconds = 0
    if (parts.length === 3) {
      const [hours, minutes, secs] = parts
      seconds = hours * 3600 + minutes * 60 + secs
    } else if (parts.length === 2) {
      const [minutes, secs] = parts
      seconds = minutes * 60 + secs
    }

    return acc + seconds
  }, 0)

  const totalHours = Math.floor(total / 3600)
  const totalMinutes = Math.floor((total % 3600) / 60)
  const remainingSeconds = total % 60

  if (totalHours > 0) {
    // Retorna no formato HH:MM:SS
    const formattedHours = String(totalHours).padStart(2, "0")
    const formattedMinutes = String(totalMinutes).padStart(2, "0")
    const formattedSeconds = String(remainingSeconds).padStart(2, "0")
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  } else {
    // Retorna no formato MM:SS
    const formattedMinutes = String(totalMinutes).padStart(2, "0")
    const formattedSeconds = String(remainingSeconds).padStart(2, "0")
    return `${formattedMinutes}:${formattedSeconds}`
  }
}
