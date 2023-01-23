import { Dimensions } from "react-native"
const { width, fontScale } = Dimensions.get("screen")

function fontNormalize(size) {
  const defaultValue = Number(423 / size).toPrecision(3)
  const toScale = defaultValue * fontScale
  return Math.floor(width / toScale)
}

const fontFamily = {
  black: 'Nunito-Black',
  bold: 'Nunito_700Bold',
  medium: 'Nunito_500Medium',
  regular: 'Nunito_400Regular'
}

const fontSize = {
  largeTitle: fontNormalize(40),
  title: fontNormalize(27),
  subtitle: fontNormalize(22),
  tall: fontNormalize(19),
  headline: fontNormalize(19),
  body: fontNormalize(17),
  small: fontNormalize(15),
  footnote: fontNormalize(13),
}

export {
  fontFamily,
  fontSize
}