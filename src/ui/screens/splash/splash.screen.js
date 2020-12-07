import React from 'react'
import FlowIcon from '../../img/icon.jpg'
import Constants from '../../../constants'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'

export function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <Image source={FlowIcon} style={styles.flowLogo} />
      <ActivityIndicator animating color={Constants.FLOW_YELLOW} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  splashContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flowLogo: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
  }
})
