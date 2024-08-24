import axios from "axios"
import { getYouTubeVideoId } from "./get-youtube-video-id"

type Video = {
  url?: string
  id?: string
}

/**
 * Obtém a duração de um vídeo do YouTube e a formata em uma string no formato "HH:MM:SS" ou "MM:SS".
 *
 * @param {Video} video - Um objeto contendo a URL do vídeo ou o ID do vídeo do YouTube.
 * @param {string} [video.url] - A URL completa do vídeo do YouTube.
 * @param {string} [video.id] - O ID do vídeo do YouTube.
 *
 * @returns {Promise<string>} - Retorna uma Promise que resolve para a duração formatada do vídeo como uma string.
 *
 * @example
 * // Retorna "02:45" para um vídeo com 2 minutos e 45 segundos.
 * getDurationYouTubeVideo({ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" })
 *   .then(duration => {
 *     console.log(duration);
 *   })
 *   .catch(error => {
 *     console.error("Erro ao obter a duração do vídeo:", error);
 *   });
 *
 * @example
 * // Retorna "01:02:45" para um vídeo com 1 hora, 2 minutos e 45 segundos.
 * getDurationYouTubeVideo({ id: "dQw4w9WgXcQ" })
 *   .then(duration => {
 *     console.log(duration);
 *   })
 *   .catch(error => {
 *     console.error("Erro ao obter a duração do vídeo:", error);
 *   });
 */
export async function getDurationYouTubeVideo({
  id,
  url
}: Video): Promise<string> {
  const videoId = id || getYouTubeVideoId(url!)

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${
      import.meta.env.VITE_REACT_YOUTUBE_API_KEY
    }`
  )

  if (data.items.length === 0) return ""

  const durationISO = data.items[0].contentDetails.duration

  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  const matches = durationISO.match(regex)

  const hours = matches?.[1] ? parseInt(matches[1]) : 0
  const minutes = matches?.[2] ? parseInt(matches[2]) : 0
  const seconds = matches?.[3] ? parseInt(matches[3]) : 0

  const formattedMinutes = String(minutes).padStart(2, "0")
  const formattedSeconds = String(seconds).padStart(2, "0")

  if (!hours) return `${formattedMinutes}:${formattedSeconds}`

  const formattedHours = String(hours).padStart(2, "0")

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
