/**
 * Extrai o ID de um vídeo do YouTube a partir de uma URL.
 *
 * Esta função recebe uma URL de vídeo do YouTube como entrada e retorna o ID
 * do vídeo se a URL for válida. Ela suporta vários formatos de URL do YouTube, incluindo:
 * - URL padrão: https://www.youtube.com/watch?v=ID_DO_VIDEO
 * - URL encurtada: https://youtu.be/ID_DO_VIDEO
 * - URL de embed: https://www.youtube.com/embed/ID_DO_VIDEO
 *
 * Se a URL for inválida ou não contiver um ID de vídeo válido, a função retornará `null`.
 *
 * @param url - A URL do vídeo do YouTube.
 * @returns O ID do vídeo, se encontrado, ou `null` se a URL for inválida.
 */
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null

  const regExp =
    /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=|watch\?.+&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}
