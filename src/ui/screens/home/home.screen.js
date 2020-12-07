import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { EpisodesList } from '../../components'

export function HomeScreen() {
  const route = useRoute()

  const { episodesData } = route.params

  return (
    <View style={styles.container}>
      <EpisodesList episodes={[...episodesData.episodes]} nextPagination={episodesData.paging.next} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    color: '#000',
    fontSize: 48
  },
})
