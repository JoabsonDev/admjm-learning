import { auth } from "@services/firebase-config"
import { User } from "firebase/auth"
import { create } from "zustand"

export type AuthStore = {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  checkAuth: () => () => void
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  checkAuth: () => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      set({ user, loading: false })
    })
    return unsubscribe
  }
}))

export default useAuthStore
