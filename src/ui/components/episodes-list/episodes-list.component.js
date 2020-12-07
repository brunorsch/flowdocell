import React, { useState } from 'react'
import { StyleSheet, ToastAndroid, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Episode, Button } from '..'
import { useApiRepository } from '../../../repository/api.repository'
import { listEpisodes } from '../../../routines/episodes'
import texts from '../../../texts'

export function EpisodesList({ episodes: episodesParam, nextPagination }) {

  const apiRepo = useApiRepository()
  const [isFetchingNewEpisodes, setFetchingNewEpisodes] = useState(false)
  const [episodes, setEpisodes] = useState(episodesParam)
  const [nextPage, setNextPage] = useState(nextPagination)
  const [hasMoreEps, setHasMoreEps] = useState(true)

  function handlePressLoadMore() {
    setFetchingNewEpisodes(true)
    listEpisodes(apiRepo, nextPage)
      .then(({ data }) => {
        if(data.episodes.length > 0) {
          const newEpisodes = [...episodes]
          setEpisodes(newEpisodes.concat(data.episodes))
  
          setNextPage(data.paging.next)
  
          setFetchingNewEpisodes(false)
        } else {
          setHasMoreEps(false)
          ToastAndroid.showWithGravity(texts.NO_MORE_EPISODES, ToastAndroid.LONG, ToastAndroid.BOTTOM)
        }
      })
      .catch(() => {
        setFetchingNewEpisodes(false)
        ToastAndroid.showWithGravity(texts.ERROR_LOAD_DATA, ToastAndroid.LONG, ToastAndroid.BOTTOM)
      })
  }

  const LoadMoreButton = () => hasMoreEps && (
    <Button
      loading={isFetchingNewEpisodes}
      style={styles.loadMoreButton}
      textColor={'#0A0A0A'}
      onPress={handlePressLoadMore}>
        Carregar mais
    </Button>
  )

return (
  <FlatList
    contentContainerStyle={styles.episodesList}
    data={episodes}
    renderItem={({ item: { id, title, artwork, description, cover } }) => (
      <Episode
        key={id}
        id={id}
        title={title}
        imageUrl={(!!artwork) ? artwork : cover}
        description={description} />
    )}
    ListFooterComponent={LoadMoreButton}
  />
)
}

const styles = StyleSheet.create({
  episodesList: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 24,
  },
  loadMoreButton: {
    marginTop: 12
  }
})
