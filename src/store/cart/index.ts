import { create } from "zustand"

export type CartStore = {
  items: string[]
  addItem: (courseId: string) => void
  removeItem: (courseId: string) => void
  clearCart: () => void
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (courseId) =>
    set((state) => {
      if (!state.items.includes(courseId)) {
        return { items: [...state.items, courseId] }
      }
      return state
    }),
  removeItem: (courseId) =>
    set((state) => ({
      items: state.items.filter((id) => id !== courseId)
    })),
  clearCart: () => set({ items: [] })
}))

export default useCartStore
