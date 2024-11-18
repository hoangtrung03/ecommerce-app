import { ComponentType } from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  bgVariant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'success'
  textVariant?: 'primary' | 'default' | 'secondary' | 'danger' | 'success'
  IconLeft?: ComponentType<any>
  IconRight?: ComponentType<any>
  styleButton?: ViewStyle
  styleText?: TextStyle
  className?: string
}

export default function CustomButton({
  onPress,
  title,
  bgVariant = 'primary',
  textVariant = 'default',
  IconLeft,
  IconRight,
  styleButton,
  styleText,
  className,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, bgStyles[bgVariant], styleButton]} {...props}>
      {IconLeft && <IconLeft />}
      <Text style={[styles.buttonText, textStyles[textVariant], styleText]}>{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 9999,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D1D5DB',
    shadowOpacity: 0.7,
    shadowRadius: 2
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'semibold',
    fontFamily: 'Poppins-SemiBold'
  }
})

const textStyles = StyleSheet.create({
  primary: {
    color: '#0286FF'
  },
  secondary: {
    color: '#6B7280'
  },
  danger: {
    color: '#EF4444'
  },
  success: {
    color: '#34C759'
  },
  default: {
    color: '#11181C'
  }
})

const bgStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#0286FF'
  },
  secondary: {
    backgroundColor: '#6B7280'
  },
  danger: {
    backgroundColor: '#EF4444'
  },
  success: {
    backgroundColor: '#34C759'
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#D1D5DB',
    borderWidth: 0.5
  }
})
