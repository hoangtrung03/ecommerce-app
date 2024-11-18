import { User } from '@/types/user.type'
import { getItemStore, removeItemStore, setItemStore } from '../utils/storageHelper'

export const setAccessTokenToStore = async (access_token: string) => {
  await setItemStore('access_token', access_token)
}

export const setRefreshTokenToStore = async (refresh_token: string) => {
  await setItemStore('refresh_token', refresh_token)
}

export const clearStore = async () => {
  await removeItemStore('access_token')
  await removeItemStore('refresh_token')
  await removeItemStore('profile')
}

export const getAccessTokenFromStore = async () => {
  const accessToken = await getItemStore('access_token')
  return accessToken || ''
}

export const getRefreshTokenFromStore = async () => {
  const refreshToken = await getItemStore('refresh_token')
  return refreshToken || ''
}

export const getProfileFromStore = async () => {
  const result = await getItemStore('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToStore = async (profile: User) => {
  await setItemStore('profile', JSON.stringify(profile))
}
