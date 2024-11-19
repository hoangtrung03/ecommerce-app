import useAppStore from '@/libs/store/auth.store'
import { getItemStore, setItemStore } from '@/libs/utils/storageHelper'
import { Redirect } from 'expo-router'
import { useEffect, useState } from 'react'

const HAS_LAUNCHED = 'HAS_LAUNCHED'

export default function Page() {
  const [hasLaunched, setHasLaunched] = useState(false)
  const [isRedirectReady, setIsRedirectReady] = useState(false)

  const { isAuthenticated } = useAppStore()

  useEffect(() => {
    const getData = async () => {
      const hasLaunched = await getItemStore(HAS_LAUNCHED)

      if (hasLaunched === 'true') {
        setHasLaunched(true)
      } else {
        await setItemStore(HAS_LAUNCHED, 'true')
      }
      setIsRedirectReady(true)
    }

    getData().catch((error) => console.log(error))
  }, [])

  if (isAuthenticated) {
    return <Redirect href='/(app)/(tabs)/home' />
  }

  if (!isRedirectReady) {
    return null
  }

  return hasLaunched ? <Redirect href='/(auth)/sign-in' /> : <Redirect href='/(app)/welcome' />
}
