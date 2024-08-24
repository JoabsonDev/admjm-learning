import { create } from "zustand"

const INITIAL_CONFIG = {
  show: false,
  title: "Deseja mesmo continuar com essa ação?",
  message: "A ação não poderá ser desfeita.",
  callback: () => {}
}

type PromptConfigStore = {
  show: boolean
  title?: string
  message?: string
  callback?: () => void
}

export type PromptStore = {
  config: PromptConfigStore
  setConfig: (config: PromptConfigStore) => void
}

export const usePrompt = create<PromptStore>((set) => {
  return {
    config: {
      show: false
    },
    setConfig: (config) => {
      set({ config: { ...INITIAL_CONFIG, ...config } })
    }
  }
})
