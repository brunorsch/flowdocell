import constants from '../constants'

const { TITLE_PATTERN, LEGACY_TITLE_PATTERN } = constants

export function isEpisodeTitleInPattern(title) {
  const matched = new RegExp(TITLE_PATTERN).exec(title)

  return (!!matched && matched.length === 3)
}

export function isEpisodeTitleInLegacyPattern(title) {
  const matched = new RegExp(LEGACY_TITLE_PATTERN).exec(title)

  return (!!matched && matched.length === 3)
}
