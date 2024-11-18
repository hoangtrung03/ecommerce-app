import { router } from 'expo-router'
import { useCallback } from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  const handleLogout = useCallback(() => {
    router.replace('/(auth)/sign-in')
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <ImageBackground source={{ uri: 'https://via.placeholder.com/400x200' }} style={styles.backgroundImage}>
            <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatarImage} />
          </ImageBackground>
          <View style={styles.info}>
            <Text style={styles.profileName}>Vũ Hoàng Trung</Text>
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Edit Profile pressed')}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    position: 'relative',
    marginBottom: 75
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 9999,
    position: 'absolute',
    bottom: 0,
    transform: [{ translateY: '50%' }],
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white'
  },
  info: {
    paddingHorizontal: 20
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  btnWrapper: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5
  },
  buttonText: {
    fontSize: 16
  }
})
