declare global {
  interface Window {
    YT: YT
    onYouTubeIframeAPIReady?: () => void
  }
}

export {}
