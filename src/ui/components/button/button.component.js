import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'
import constants from '../../../constants'

export function Button(
  { style, color, text, textColor, textStyle, children, onPress, onPressIn, onPressOut, onLongPress, loading, loaderSize, inverse, rounded, childComponent: ChildComponent }) {

  const specialColors = {
    primary: constants.FLOW_YELLOW,
    error: '#BB2124',
    success: '#22bb33',
    info: '#5bc0de',
    warn: '#f0ad4e',
    neutral: '#aaaaaa'
  }

  const colorValue = (specialColors[color] || color)

  const styles = StyleSheet.create({
    button: {
      padding: 12,
      ...style,
      backgroundColor: inverse ? 'rgba(0, 0, 0, 0.0)' : colorValue,
      borderWidth: inverse ? 1 : null,
      borderColor: inverse ? colorValue : null,
      borderRadius: rounded ? 8 : null
    },
    text: {
      ...textStyle,
      color: textColor
    }
  })

  return (
    <Pressable style={styles.button}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}>
      {loading ? (
        <ActivityIndicator color={textColor} animating size={loaderSize || 'small'} />
      ) : (
        <ChildComponent style={styles.text}>{children || text}</ChildComponent>
      )}
    </Pressable>
  )

}


Button.defaultProps = {
  color: 'primary',
  textColor: '#FFF',
  inverse: false,
  rounded: true,
  childComponent: Text,
}
