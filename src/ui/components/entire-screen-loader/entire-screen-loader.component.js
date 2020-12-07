import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import constants from '../../../constants'

export function EntireScreenLoader({ loaderComponent }) {
  return (
    <View style={styles.loadingContainer}>
      {loaderComponent}
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

EntireScreenLoader.defaultProps = {
  loaderComponent: <ActivityIndicator animating color={constants.FLOW_YELLOW} size="large" />,
}
