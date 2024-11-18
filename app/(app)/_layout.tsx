import { Stack } from 'expo-router'

export default function AppLayout() {
  return (
    <Stack screenOptions={{ animation: 'fade' }}>
      <Stack.Screen name='welcome' options={{ headerShown: false, title: 'Welcome' }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  )
}
