import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import constants from '../../../constants'
import { getStylePropAsArray } from '../../../utils'

export function Title({ children, size, color, style }) {

  const styleArray = getStylePropAsArray(style)

  const styles = StyleSheet.create({
    title: {
      color,
      fontSize: size,
    }
  })

  return (
    <Text style={[styles.title, ...styleArray]}>{children}</Text>
  )
}

Title.defaultProps = {
  size: 32,
  color: constants.FLOW_YELLOW,
  style: []
}

