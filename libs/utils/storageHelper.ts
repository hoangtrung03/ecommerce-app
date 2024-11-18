import AsyncStorage from '@react-native-async-storage/async-storage'

export const setItemStore = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log('Error storing data', error)
  }
}

export const getItemStore = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)

    if (value !== null) {
      return value
    }
  } catch (error) {
    console.log('Error getting data', error)
  }
}

export const removeItemStore = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log('Error removing data', error)
  }
}
