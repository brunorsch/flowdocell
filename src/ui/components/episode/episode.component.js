import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import constants from '../../../constants'
import { getEpisodeNameAndNumberByTitle } from '../../../routines/episodes'

const TITLE_LIMIT = 70
const DESCRIPTION_LIMIT = 110

export function Episode({ title, imageUrl, description, id }) {

  const nav = useNavigation()
  const [name, number] = getEpisodeNameAndNumberByTitle(title)

  if(title.length > TITLE_LIMIT) {
    title = resume(title, TITLE_LIMIT)
  }

  if(description.length > DESCRIPTION_LIMIT) {
    description = resume(description, DESCRIPTION_LIMIT)
  }

  function handlePressCard() {
    nav.navigate('episode-details', { episodeId: id })
  }

  return (
    <Pressable style={styles.card} onPress={handlePressCard}>
      <View style={styles.imageContainer}>
        <ImageBackground resizeMode="cover" style={[styles.image]} source={{ uri: imageUrl }}>
          <LinearGradient
            style={styles.gradient}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']}>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.title}>
          <Text>
            <Text style={styles.name}>{!!name ? name : title}</Text>
            {(!!number || number === 0) && (<Text style={styles.number}>&nbsp;{`#${number}`}</Text>)}
          </Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    width: '96%',
    height: 116,
    borderRadius: 12,
    marginVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden'
  },
  imageContainer: {
    width: '30%',
    height: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    transform: [{
      scale: 1.2
    }]
  },
  gradient: {
    width: '100%',
    height: '100%'
  },
  detailsContainer: {
    width: '70%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  title: {
    width: '100%',
  },
  name: {
    color: constants.FLOW_YELLOW,
    fontSize: 16
  },
  number: {
    fontSize: 12,
    color: '#666'
  },
  description: {
    color: '#A9A9A9',
    fontSize: 12
  }
})

Episode.defaultProps = {
  imageUrl: 'https://artworks-flow.s3-sa-east-1.amazonaws.com/AgregadoresPadrao.jpg'
}

function resume(longDescription, limit) {
  return longDescription.substring(0, limit) + '...'
}
