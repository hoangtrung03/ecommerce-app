import { router, Stack, useFocusEffect } from 'expo-router'
import { useCallback } from 'react'

export default function AppLayout() {
  useFocusEffect(
    useCallback(() => {
      router.replace('/(app)/(tabs)/home')
    }, [])
  )

  return (
    <Stack screenOptions={{ animation: 'fade' }}>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='product-detail' options={{ headerShown: false, title: 'Welcome' }} />
    </Stack>
  )
}
