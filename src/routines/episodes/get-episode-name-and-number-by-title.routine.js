import constants from '../../constants'
import { isEpisodeTitleInLegacyPattern, isEpisodeTitleInPattern } from '../../utils'

const { TITLE_PATTERN, LEGACY_TITLE_PATTERN } = constants

export function getEpisodeNameAndNumberByTitle(title) {
  let matchedElements = []
  
  if(isEpisodeTitleInPattern(title)) {
    matchedElements = [...new RegExp(TITLE_PATTERN).exec(title)]
    matchedElements.shift()
  } else if(isEpisodeTitleInLegacyPattern(title)) {
    matchedElements = [...new RegExp(LEGACY_TITLE_PATTERN).exec(title)]
    matchedElements.shift()
    matchedElements.reverse()
  }

  return matchedElements
}
