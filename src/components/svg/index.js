import { SvgProps } from "react-native-svg";
import {
  CoinOne,
  Setting,
  Share,
  Stars,
  SwipeUp,
  Tap,
  TapCoin,
  TapDiagonal
} from "./components";

export type SvgTypes = 'coin-one' | 'setting' | 'share' | 'stars' | 'swipe-up' | 'tap' | 'tap-coin' | 'tap-diagonal'

type Props = SvgProps & {
  name?: SvgTypes
}

const components = {
  'coin-one': CoinOne,
  'share': Share,
  'setting': Setting,
  'stars': Stars,
  'swipe-up': SwipeUp,
  'tap': Tap,
  'tap-coin': TapCoin,
  'tap-diagonal': TapDiagonal
}

export default function SvgComponent(props: Props) {
  const Component = components[props.name || 'tap'];
  return (
    <Component {...props} />
  )
}