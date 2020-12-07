import Constants from "../constants"
import { useAxios } from "../hooks/use-axios"
import { useCallback } from 'react'

export function useApiRepository() {
  const axios = useAxios(Constants.API_BASE_URL)

  async function findAllEpisodes(nextPaging) {
    const body = {
      params: {
        filter: 'episodes'
      }
    }

    if(!!nextPaging) {
      body.params.paging = {
        next: nextPaging,
      }
    }
    return axios.post('/v2/episodes/list', body)
  }

  async function findEpisodeById(id) {
    return axios.get(`/v2/episodes/view/${id}`)
  }

  return useCallback({
    findAllEpisodes,
    findEpisodeById
  }, [])
}
