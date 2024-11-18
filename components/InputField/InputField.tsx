import { useState } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View
} from 'react-native'

interface InputFieldProps extends TextInputProps {
  label?: string
  icon?: any
  secureTextEntry?: boolean
  labelStyle?: object
  containerStyle?: object
  inputStyle?: object
  iconStyle?: object
  className?: string
}

export default function InputField({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.wrapper}>
          {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
          <View style={[styles.container, containerStyle, isFocused && styles.focusInput]}>
            {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
            <TextInput
              style={[styles.input, inputStyle]}
              secureTextEntry={secureTextEntry}
              {...props}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },
  label: {
    fontSize: 18
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F1F4FF',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 48
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    textAlign: 'left',
    borderRadius: 8,
    fontFamily: 'Poppins-Regular'
  },
  focusInput: {
    borderColor: '#0286FF',
    borderWidth: 1
  }
})
