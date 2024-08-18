import { useYouTubeStore } from "@store/youtube"
import { ComponentProps, useEffect, useRef } from "react"
import { tv, VariantProps } from "tailwind-variants"

const variants = tv({
  base: "bg-black w-full max-h-[450px] h-full aspect-[16/9]"
})

type YouTubePlayerProps = Omit<ComponentProps<"div">, "onTimeUpdate"> &
  VariantProps<typeof variants> & {
    videoId?: string
    options?: PlayerVars
    onFinish?: () => void
    onTimeUpdate?: (timeData: { current: number; total: number }) => void
  }

const INITIAL_PLAYER_VARS: PlayerVars = {
  autoplay: 0,
  cc_load_policy: 0,
  color: "red",
  controls: 1,
  disablekb: 0,
  enablejsapi: 0,
  // end: 0,
  fs: 1,
  // hl: "",
  iv_load_policy: 3,
  // list: "",
  // listType: "playlist",
  // loop: 0,
  modestbranding: 1,
  // origin: "",
  // playlist: "",
  // playsinline: 0,
  rel: 0,
  showinfo: 0,
  start: 0
}

export default function YouTubePlayer({
  videoId,
  options,
  className,
  onFinish,
  onTimeUpdate,
  ...props
}: YouTubePlayerProps) {
  const classNames = variants({ className })
  const playerRef = useRef<HTMLDivElement | null>(null)
  const playerInstance = useRef<YT["Player"] | null>(null)
  const timeUpdateInterval = useRef<NodeJS.Timeout | null>(null)

  const { autoplay, player, setPlayer } = useYouTubeStore(
    ({ autoplay, player, setPlayer }) => ({ autoplay, player, setPlayer })
  )
  if (autoplay === 1) options = { ...options, autoplay: 1 }

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const script = document.createElement("script")
        script.src = "https://www.youtube.com/iframe_api"
        script.onload = () => {
          window.onYouTubeIframeAPIReady = () => {
            initializePlayer()
          }
        }
        document.body.appendChild(script)
      } else {
        initializePlayer()
      }
    }

    const initializePlayer = () => {
      if (playerRef.current && window.YT) {
        const { YT } = window
        playerInstance.current = new YT.Player(playerRef.current, {
          videoId,
          playerVars: { ...INITIAL_PLAYER_VARS, ...options },
          events: {
            onReady: (event) => {
              console.log("Player is ready", event)

              const startTime =
                player?.videoId === videoId ? player!.current : 0
              if (startTime > 0) {
                playerInstance.current?.seekTo(startTime, true)
              }
              if (
                playerInstance.current?.getPlayerState() ===
                YT.PlayerState.PLAYING
              ) {
                startMonitoringTime()
              }
            },
            onStateChange: (event) => {
              switch (event.data) {
                case YT.PlayerState.ENDED:
                  onFinish?.()
                  stopMonitoringTime()
                  break
                case YT.PlayerState.PLAYING:
                  startMonitoringTime()
                  break
                default:
                  stopMonitoringTime()
                  break
              }
            }
          }
        })
      }
    }

    const startMonitoringTime = () => {
      if (
        playerInstance.current &&
        playerInstance.current.getPlayerState &&
        playerInstance.current.getPlayerState() ===
          window.YT.PlayerState.PLAYING
      ) {
        timeUpdateInterval.current = setInterval(() => {
          const current = playerInstance.current!.getCurrentTime()
          const total = playerInstance.current!.getDuration()

          setPlayer({ current, total, videoId: videoId! })
          // TODO: estudar um modo de remover esse controle do setPlayer e deixar o onTimeUpdate fazer isso
          onTimeUpdate?.({ current, total })
        }, 1000)
      }
    }

    const stopMonitoringTime = () => {
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current)
        timeUpdateInterval.current = null
      }
    }

    loadYouTubeAPI()

    return () => {
      const script = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      )
      if (script && script.parentNode === document.body)
        document.body.removeChild(script)

      stopMonitoringTime()
    }
  }, [onFinish, onTimeUpdate, options, videoId])

  return <div ref={playerRef} className={classNames} {...props} />
}
