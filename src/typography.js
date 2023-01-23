import { Dimensions } from "react-native"
const { width, fontScale } = Dimensions.get("screen")

function fontNormalize(size) {
  const defaultValue = Number(423 / size).toPrecision(3)
  const toScale = defaultValue * fontScale
  return Math.floor(width / toScale)
}

export const fontFamily = {
  black: 'Nunito_900Black',
  bold: 'Nunito_700Bold',
  medium: 'Nunito_500Medium',
  regular: 'Nunito_400Regular'
}

export const fontSize = {
  largeTitle: fontNormalize(40),
  title: fontNormalize(27),
  subtitle: fontNormalize(22),
  headline: fontNormalize(19),
  body: fontNormalize(17),
  small: fontNormalize(15),
  footnote: fontNormalize(13),
}

export const iconSize = {
  small: fontNormalize(19),
  regular: fontNormalize(19),
}

export default {
  fontFamily,
  fontSize
}