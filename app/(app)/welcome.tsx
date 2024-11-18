import CustomButton from '@/components/CustomButton'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'

export default function Home() {
  const swiperRef = useRef<Swiper>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const onboarding = [
    {
      id: 1,
      title: 'Start Learning from Anywhere',
      description:
        'These lessons show you to use digital tools to learn effectively, from the comfort of your own home. ',
      image: require('../../assets/images/welcome/bg-first.jpg')
    },
    {
      id: 2,
      title: 'Online access to our live classess',
      description: 'It’s like that you’r attending live classess being with your classmates and favourite teachers.',
      image: require('../../assets/images/welcome/bg-2nd.jpg')
    },
    {
      id: 3,
      title: 'All assinments can be submit online',
      description:
        'Finish your assignments and submit in our website or in mobile app. Even you can get help if you  got stuck somewhere.',
      image: require('../../assets/images/welcome/bg-3rd.jpg')
    }
  ]

  const isLastSlide = useMemo(() => activeIndex === onboarding.length - 1, [activeIndex, onboarding.length])

  const handleButtonPress = useCallback(() => {
    if (isLastSlide) {
      router.replace('/(auth)/sign-in')
    } else {
      swiperRef?.current?.scrollBy(1)
    }
  }, [isLastSlide])

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.replace('/(auth)/sign-in')
        }}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={swiperStyle.dot} />}
        activeDot={<View style={[swiperStyle.dot, swiperStyle.activeDot]} />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} style={styles.slide}>
            <ImageBackground source={item.image} style={styles.imageBackground}>
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.42)', 'rgba(0,0,0,0.73)', '#000000']}
                style={styles.overlay}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        onPress={handleButtonPress}
        styleButton={styles.button}
        styleText={{ color: '#ffffff' }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff'
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 5,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    zIndex: 2,
    fontWeight: 'bold'
  },
  skipText: {
    color: '#000000',
    fontSize: 16
  },
  button: {
    width: '80%',
    position: 'absolute',
    bottom: 46,
    alignSelf: 'center',
    zIndex: 5
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end'
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70%',
    zIndex: 1
  },
  textContainer: {
    paddingHorizontal: 30,
    zIndex: 2,
    marginBottom: 180
  },
  title: {
    fontSize: 36,
    fontWeight: 'semibold',
    color: '#ffffff',
    marginBottom: 34
  },
  description: {
    fontSize: 20,
    fontWeight: 'light',
    color: '#ffffff'
  }
})

const swiperStyle = StyleSheet.create({
  dot: {
    width: 10,
    height: 7,
    marginHorizontal: 3,
    backgroundColor: '#D9D9D9',
    borderRadius: 9999,
    marginBottom: 139
  },
  activeDot: {
    width: 32,
    backgroundColor: '#0286FF'
  }
})
