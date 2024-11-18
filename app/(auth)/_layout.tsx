import { Stack } from 'expo-router'

export default function AppLayout() {
  return (
    <Stack screenOptions={{ animation: 'fade' }}>
      <Stack.Screen name='sign-in' options={{ headerShown: false }} />
      <Stack.Screen name='sign-up' options={{ headerShown: false }} />
      <Stack.Screen name='forgot-password' options={{ headerShown: false }} />
    </Stack>
  )
}
