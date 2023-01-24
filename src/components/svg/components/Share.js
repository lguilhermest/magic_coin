import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#000"
    strokeLinecap="round"
    {...props}
  >
    <Circle cx={5} cy={12} r={3} opacity={0.1} fill="#059cf7" stroke="none" />
    <Circle cx={5} cy={12} r={3} />
    <Circle cx={19} cy={19} r={3} opacity={0.1} fill="#059cf7" stroke="none" />
    <Circle cx={19} cy={19} r={3} />
    <Circle cx={19} cy={5} r={3} opacity={0.1} fill="#059cf7" stroke="none" />
    <Circle cx={19} cy={5} r={3} />
    <Path d="m7.6 13.5 8.55 4.5M16.4 6.5 7.85 11" />
  </Svg>
)

export default SvgComponent;