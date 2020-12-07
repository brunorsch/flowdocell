export async function getEpisode(apiRepo, episodeId) {
  return await apiRepo.findEpisodeById(episodeId)
}
