export function getStylePropAsArray(styleProp) {
  let styleArray = styleProp

  if(!Array.isArray(styleProp)) {
    styleArray = [styleProp]
  }

  return styleArray;
}
