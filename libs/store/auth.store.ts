import { User } from '@/types/user.type'
import { create } from 'zustand'
import { clearStore, getAccessTokenFromStore, getProfileFromStore } from '../http/auth'

interface AppState {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  profile: User | null
  setProfile: (profile: User | null) => void
  reset: () => void
}

const useAppStore = create<AppState>((set) => {
  const initializeProfile = async () => {
    const storedProfile = await getProfileFromStore()
    set({ profile: storedProfile })

    const accessToken = await getAccessTokenFromStore()
    const isAuthenticated = accessToken !== null && accessToken !== ''
    set({ isAuthenticated })
  }

  initializeProfile()

  return {
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => set(() => ({ isAuthenticated: value })),
    profile: null,
    setProfile: (profile: User | null) => set(() => ({ profile })),
    reset: () =>
      set(() => {
        clearStore()

        return {
          isAuthenticated: false,
          profile: null
        }
      })
  }
})

export default useAppStore
