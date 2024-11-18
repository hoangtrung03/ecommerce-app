import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const handleButtonPress = () => {
    console.log('Button Pressed')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to My Homepage</Text>
          <Image source={{ uri: 'https://via.placeholder.com/300x150' }} style={styles.headerImage} />
        </View>

        {/* Main Content Section */}
        <View style={styles.mainContent}>
          <Text style={styles.subtitle}>About Us</Text>
          <Text style={styles.paragraph}>
            We offer a variety of services to cater to your needs. Our team is dedicated to providing the best
            experience possible.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Trung. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  scrollContainer: {
    padding: 16
  },
  header: {
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12
  },
  headerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8
  },
  mainContent: {
    marginBottom: 32
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  footer: {
    marginTop: 24,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    color: '#666'
  }
})
