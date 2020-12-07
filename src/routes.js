import { EpisodeDetailsScreen, HomeScreen } from './ui/screens'

export default [
  { name: 'home', title: 'Episódios', displayName: 'Início',  component: HomeScreen, headerShown: true },
  { name: 'episode-details', title: '', component: EpisodeDetailsScreen, headerShown: false },
]
