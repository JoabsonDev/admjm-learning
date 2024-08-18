import { create } from "zustand"

export type YouTubePlayerLectureState = {
  videoId: string
  current: number
  total: number
}
type Autoplay = 0 | 1
export type YouTubePlayerStore = {
  autoplay: Autoplay
  setAutoplay: (autoplay: Autoplay) => void
  player: YouTubePlayerLectureState | null
  setPlayer: (player: YouTubePlayerLectureState | null) => void
}

export const useYouTubeStore = create<YouTubePlayerStore>((set) => {
  const initialAutoplayState = (() => {
    try {
      const autoplay = localStorage.getItem("autoplay")
      if (autoplay) return parseInt(autoplay) as Autoplay
      return 0
    } catch {
      return 0
    }
  })()

  const initialPlayerState = (() => {
    try {
      const youtubePlayer = localStorage.getItem("youtube-player")
      if (youtubePlayer)
        return JSON.parse(youtubePlayer) as YouTubePlayerLectureState
      return null
    } catch {
      return null
    }
  })()

  return {
    autoplay: initialAutoplayState,
    setAutoplay: (newAutoplay) =>
      set(() => {
        const autoplay = newAutoplay
        localStorage.setItem("autoplay", JSON.stringify(autoplay))
        return { autoplay }
      }),
    player: initialPlayerState,
    setPlayer: (newPlayer) =>
      set(() => {
        const player = newPlayer
        localStorage.setItem("youtube-player", JSON.stringify(player))
        return { player }
      })
  }
})
