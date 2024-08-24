/**
 * Formats a duration given in seconds into a human-readable string.
 *
 * @param {number} durationInSeconds - The duration in seconds to be formatted.
 * @param {"0h 0min" | "hh:mm:ss"} [format="hh:mm:ss"] - The format in which the duration should be returned.
 *   - `"0h 0min"`: Returns the duration in a "Xh Ymin" format, omitting minutes if they are less than 1.
 *   - `"hh:mm:ss"`: Returns the duration in a "HH:MM:SS" format, including leading zeros.
 *
 * @returns {string} The formatted duration string.
 *
 * @example
 * formatDuration(3665, "0h 0min"); // "1h 1min"
 * formatDuration(3665, "hh:mm:ss"); // "01:01:05"
 */
export function formatDuration(
  durationInSeconds: number,
  format: "0h 0min" | "hh:mm:ss" = "hh:mm:ss"
): string {
  const hours = Math.floor(durationInSeconds / 3600)
  const minutes = Math.floor((durationInSeconds % 3600) / 60)
  const remainingSeconds = durationInSeconds % 60

  if (format === "0h 0min") {
    return hours >= 1
      ? minutes < 1
        ? `${hours}h`
        : `${hours}h ${minutes}min`
      : `${minutes}min`
  } else if (format === "hh:mm:ss") {
    const formattedHours = String(hours).padStart(2, "0")
    const formattedMinutes = String(minutes).padStart(2, "0")
    const formattedSeconds = String(remainingSeconds).padStart(2, "0")

    return hours > 0
      ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}` // HH:MM:SS
      : `${formattedMinutes}:${formattedSeconds}` // MM:SS
  }

  return ""
}
