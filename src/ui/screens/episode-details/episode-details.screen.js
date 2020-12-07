import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, ToastAndroid, View, Text, Linking } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useApiRepository } from '../../../repository/api.repository'
import { getEpisode, getEpisodeNameAndNumberByTitle } from '../../../routines/episodes'
import texts from '../../../texts'
import { Button, EntireScreenLoader, Title } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'

export function EpisodeDetailsScreen() {

  const apiRepo = useApiRepository()
  const route = useRoute()
  const [paramData] = useState(route.params)
  const [loaded, setLoaded] = useState(false)
  const [hasError] = useState(false)
  const [episodeData, setEpisodeData] = useState({})
  const { episodeId } = paramData
  const { title, artwork, cover, description, duration, feed, mp3 } = episodeData

  const [name, number] = getEpisodeNameAndNumberByTitle(title)

  useEffect(() => {
    getEpisode(apiRepo, episodeId)
      .then(({ data: { episode } }) => {
        setEpisodeData({ ...episode })
        setLoaded(true)
      })
      .catch(() => {
        setLoaded(true)
        ToastAndroid.show(
          texts.ERROR_LOAD_DATA,
          ToastAndroid.LONG)
      })
  }, [])

  const actions = [
    { key: 'mp3', name: 'Baixar episódio (MP3)', onPress: () => openUrl(mp3) },
    { key: 'youtube', name: 'YouTube', onPress: () => openYoutubeUrl(feed['youtube']) },
    { key: 'spotify', name: 'Spotify', onPress: () => openUrl(feed['spotify']) },
    { key: 'google', name: 'Google Podcast', onPress: () => openUrl(feed['google']) },
    { key: 'apple', name: 'Apple Podcast', onPress: () => openUrl(feed['apple']) },
    { key: 'deezer', name: 'Deezer', onPress: () => openUrl(feed['deezer']) },
    { key: 'amazon', name: 'Amazon Music', onPress: () => openUrl(feed['amazon']) }
  ]

  const ActionButton = (btnProps) => <Button {...btnProps} textColor="#090909" style={styles.actionButton} textStyle={styles.actionButtonText} /> 

  const ActionButtons = () => actions
      .filter(({ key }) => !!feed[key] || key === 'mp3')
      .map(({name, onPress}, index) => <ActionButton key={index} onPress={onPress}>{name}</ActionButton>)

  if (hasError) return <View />

  return loaded ? (
    <ScrollView contentContainerStyle={styles.container}>
      <Image resizeMode='contain' style={styles.art} source={{ uri: (!!artwork ? artwork : cover) }} />
      <View style={styles.titleContainer}>
        <Title size={24} style={styles.title}>
          {!!name ? name : title}
        </Title>
        <Title size={16} color="#666" style={styles.subtitle}>
          {!!number && `Episódio #${number} ⬝ `}{duration}
        </Title>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
      <ActionButtons />
    </ScrollView>
  ) : (
    <EntireScreenLoader />
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 32,
  },
  titleContainer: {
    paddingVertical: 16,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingBottom: 8,
    marginBottom: 8
  },
  description: {
    color: '#A9A9A9',
    textAlign: 'center',
    fontSize: 18
  },
  art: {
    height: 256,
    width: '80%'
  },
  actionButton: {
    width: '80%',
    marginBottom: 6,
  },
  actionButtonText: {
    fontSize: 16,
    textAlign: 'center'
  }
})

function openYoutubeUrl(video_id) {
  openUrl(`http://youtu.be/${video_id}`)
}

function openUrl(url) {
  Linking.openURL(url)
}
