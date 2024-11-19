import { Stack } from 'expo-router'

export default function AppLayout() {
  return (
    <Stack screenOptions={{ animation: 'fade' }}>
      <Stack.Screen name='[id]' options={{ headerShown: false }} />
    </Stack>
  )
}
