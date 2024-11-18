import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignUp() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleRegister = useCallback(() => {
    console.log('login')
  }, [])

  return (
    <SafeAreaView style={styles.container} data-test-id='sign-in-page'>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.description}>Create an account so you can explore all the existing jobs</Text>
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
        <InputField
          placeholder='Confirm Password'
          secureTextEntry={true}
          textContentType='password'
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
          containerStyle={{ height: 64 }}
        />
        <CustomButton
          title='Sign Up'
          onPress={handleRegister}
          styleText={{ color: 'white' }}
          styleButton={styles.button}
        />
        <Link href='/(auth)/sign-in' style={styles.createNewAccount}>
          Already have an account
        </Link>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 40 }}>
        <Text style={[styles.createNewAccount, { color: '#0286FF' }]}>Or continue with</Text>
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
    paddingTop: 100,
    backgroundColor: '#ffffff'
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
    marginTop: 74,
    gap: 30
  },
  button: {
    borderRadius: 8,
    height: 64,
    marginTop: 12
  },
  createNewAccount: {
    textAlign: 'center',
    fontWeight: 'semibold',
    fontFamily: 'Poppins-SemiBold'
  },
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
