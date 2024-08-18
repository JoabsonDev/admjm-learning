type BinaryOption = 0 | 1
type ListType = "playlist" | "search" | "user_uploads"
type Color = "red" | "white"
type PlayerVars = {
  autoplay?: BinaryOption
  cc_load_policy?: BinaryOption
  color?: Color
  controls?: 0 | 1 | 2
  disablekb?: BinaryOption
  enablejsapi?: BinaryOption
  end?: number
  fs?: BinaryOption
  hl?: string
  iv_load_policy?: 1 | 3
  list?: string
  listType?: ListType
  loop?: BinaryOption
  modestbranding?: BinaryOption
  origin?: string
  playlist?: string
  playsinline?: BinaryOption
  rel?: BinaryOption
  showinfo?: BinaryOption
  start?: number
}

type SuggestedQuality =
  | "small"
  | "medium"
  | "large"
  | "hd720"
  | "hd1080"
  | "highres"
  | "default"

type Rate = 0.25 | 0.5 | 1 | 1.5 | 2

type Error =
  | 2 // A solicitação contém um valor de parâmetro inválido. Por exemplo, este erro ocorre se você especificar um ID de vídeo que não tem 11 caracteres, ou se o ID de vídeo contém caracteres inválidos, como pontos de exclamação ou asteriscos.
  | 5 // O conteúdo solicitado não pode ser reproduzido em um player HTML5, ou ocorreu outro erro relacionado ao player HTML5.
  | 101 // O vídeo solicitado não foi encontrado. Esse erro ocorrerá quando um vídeo tiver sido removido (por qualquer motivo) ou marcado como privado.
  | 102 // O proprietário do vídeo solicitado não permite que ele seja reproduzido em players incorporados.
  | 150 // Esse erro é o mesmo que o 101. É apenas um erro 101 disfarçado.

enum PlayerState {
  NOT_STARTED = -1, // Não iniciado
  ENDED = 0, // Encerrado
  PLAYING = 1, // Em reprodução
  PAUSED = 2, // Em pausa
  BUFFERING = 3, // Armazenando em buffer
  CUED = 5 // Vídeo indicado
}

type PlayerEventType<Data> = {
  type?: string
  data: Data
}

type PlayerEventTarget<Data> = {
  target?: Player
  data: Data
}

type PlayerEvent<Data> = PlayerEventType<Data> | PlayerEventTarget<Data>

type Player = {
  // Reproduzir um vídeo
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void

  // Reproduzir um vídeo em uma playlist
  clearVideo: () => void
  nextVideo: () => void
  previousVideo: () => void
  playVideoAt: (index: number) => void

  // Alterar o volume do player
  mute: () => void
  unMute: () => void
  isMuted: () => boolean
  setVolume: (volume: number) => boolean
  getVolume: () => number
  setSize: (width: number, height: number) => Player

  // Definir a taxa de reprodução
  getPlaybackRate: () => number
  setPlaybackRate: (suggestedRate: number) => void
  getAvailablePlaybackRates: () => Rate[]
  setLoop: (loopPlaylists: boolean) => void
  setShuffle: (shufflePlaylist: boolean) => void

  // Status da reprodução
  getVideoLoadedFraction: () => number
  getPlayerState: () => PlayerState
  getCurrentTime: () => number
  getVideoStartBytes: () => number
  getVideoBytesLoaded: () => number
  getVideoBytesTotal: () => number

  // Qualidade da reprodução
  getPlaybackQuality: () => string
  setPlaybackQuality: (suggestedQuality: SuggestedQuality) => void
  getAvailableQualityLevels: () => SuggestedQuality[]

  // Recuperar informações do vídeo
  getDuration: () => number
  getVideoUrl: () => string
  getVideoEmbedCode: () => string
  getPlaylist: () => string[]
  getPlaylistIndex: () => number

  // Adicionar ou remover uma escuta de evento
  addEventListener: (event: string, listener: (event: string) => void) => void
  removeEventListener: (
    event: string,
    listener: (event: string) => void
  ) => void

  // Acessar e modificar nós DOM
  getIframe: () => HTMLIFrameElement
  destroy: () => void
}

type PlayerStateEvent = PlayerEvent<PlayerState>
type PlaybackQualityChangeEvent = PlayerEvent<SuggestedQuality>
type PlaybackRateChangeEvent = PlayerEvent<Rate>
type ErrorEvent = PlayerEvent<Error>
type Events = {
  onReady?: (event: PlayerEvent<null>) => void
  onStateChange?: (event: PlayerStateEvent) => void
  onPlaybackQualityChange?: (event: PlaybackQualityChangeEvent) => void
  onPlaybackRateChange?: (event: PlaybackRateChangeEvent) => void
  onError?: (event: ErrorEvent) => void
}

type PlayerOptions = {
  height?: string
  width?: string
  videoId?: string
  playerVars?: PlayerVars
  events: Events
}

type PlayerInstance = new (
  element: HTMLElement,
  options: PlayerOptions
) => YT.Player

type YT = {
  Player: PlayerInstance & Player
  PlayerState: {
    [K in keyof typeof PlayerState]: (typeof PlayerState)[K]
  }
  Event: Event
  PlayerOptions: PlayerOptions
}
