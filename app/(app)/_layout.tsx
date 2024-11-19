import useAppStore from '@/libs/store/auth.store'
import { Redirect, Stack } from 'expo-router'

export default function AppLayout() {
  const { isAuthenticated } = useAppStore()

  if (!isAuthenticated) {
    return <Redirect href='/(auth)/sign-in' />
  }

  return (
    <Stack screenOptions={{ animation: 'fade' }}>
      <Stack.Screen name='welcome' options={{ headerShown: false, title: 'Welcome' }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  )
}
