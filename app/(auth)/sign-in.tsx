import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleLogin = useCallback(() => {
    router.push('/(app)/(tabs)/home')
  }, [])

  return (
    <SafeAreaView style={styles.container} data-test-id='sign-in-page'>
      <View>
        <Text style={styles.title}>Login here</Text>
        <Text style={styles.description}>Welcome back you’ve been missed!</Text>
        <View data-test-id='form-sign-in' style={styles.inputFieldWrapper}>
          <InputField
            placeholder='Email'
            textContentType='emailAddress'
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            containerStyle={{ height: 64 }}
          />
          <InputField
            placeholder='Password'
            secureTextEntry={true}
            textContentType='password'
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            containerStyle={{ height: 64 }}
          />
          <Link href='/(auth)/forgot-password' style={styles.forgotPassword}>
            Forgot your password?
          </Link>
          <CustomButton
            title='Sign In'
            onPress={handleLogin}
            styleText={{ color: 'white' }}
            styleButton={styles.button}
          />
          <Link href='/(auth)/sign-up' style={styles.centerText}>
            Create new account
          </Link>
        </View>
      </View>
      <View style={styles.separatorWrapper}>
        <Text style={[styles.centerText, { color: '#0286FF' }]}>Or continue with</Text>
        <View style={styles.separator}>
          {Platform.OS === 'android' && (
            <TouchableOpacity style={styles.separatorBtn}>
              <Ionicons name='logo-google' size={28} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.separatorBtn}>
            <Ionicons name='logo-facebook' size={28} />
          </TouchableOpacity>
          {Platform.OS === 'ios' ||
            (Platform.OS === 'macos' && (
              <TouchableOpacity style={styles.separatorBtn}>
                <FontAwesome name='apple' size={28} />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 26,
    color: '#0286FF',
    fontFamily: 'Poppins-Bold'
  },
  description: {
    fontSize: 20,
    fontWeight: 'semibold',
    textAlign: 'center',
    maxWidth: 225,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold'
  },
  inputFieldWrapper: {
    marginTop: 20,
    gap: 12
  },
  button: {
    borderRadius: 8,
    height: 64
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#0286FF',
    fontWeight: 'semibold',
    fontFamily: 'Poppins-SemiBold',
    margin: 0,
    padding: 0
  },
  centerText: {
    textAlign: 'center',
    fontWeight: 'semibold',
    fontFamily: 'Poppins-SemiBold'
  },
  separatorWrapper: {},
  separator: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  separatorBtn: {
    width: 60,
    borderRadius: 8,
    backgroundColor: '#ECECEC',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  }
})
