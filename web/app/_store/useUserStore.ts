import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  name: string
}

type Action = {
  setName: (name: State['name']) => void
}

export const useUserStore = create<State & Action>()(
  persist(
    (set) => ({
      name: '',
      setName: (name) => set(() => ({ name })),
    }),
    { name: 'user' }
  )
)
