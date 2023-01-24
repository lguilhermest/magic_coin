import { SvgProps } from "react-native-svg";
import {
  Setting,
  Share,
  Stars,
  SwipeUp,
  Tap,
  TapDiagonal
} from "./components";

export type SvgTypes = 'setting' | 'share' | 'stars' | 'swipe-up' | 'tap' | 'tap-diagonal'

type Props = SvgProps & {
  name?: SvgTypes
}

const components = {
  'share': Share,
  'setting': Setting,
  'stars': Stars,
  'swipe-up': SwipeUp,
  'tap': Tap,
  'tap-diagonal': TapDiagonal
}

export default function SvgComponent(props: Props) {
  const Component = components[props.name || 'tap'];
  return (
    <Component {...props} />
  )
}