import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    height={200}
    width={200}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    fill="#05445E"
    {...props}
  >
    <Circle
      style={{
        fill: "#ffca12",
      }}
      cx={105.052}
      cy={88.733}
      r={60.175}
    />
    <Circle
      style={{
        fill: "#ffca12",
      }}
      cx={336.574}
      cy={256}
      r={60.175}
    />
    <Circle
      style={{
        fill: "#ffca12",
      }}
      cx={185.626}
      cy={423.267}
      r={60.175}
    />
    <Path d="M10.199 98.932h25.227c4.957 33.988 34.286 60.175 69.626 60.175s64.669-26.187 69.626-60.175h327.123c5.632 0 10.199-4.566 10.199-10.199s-4.567-10.199-10.199-10.199H174.678c-4.957-33.988-34.286-60.175-69.626-60.175S40.383 44.546 35.426 78.534H10.199C4.567 78.534 0 83.1 0 88.733s4.567 10.199 10.199 10.199zm94.853-60.175c27.557 0 49.976 22.419 49.976 49.976s-22.419 49.976-49.976 49.976-49.976-22.419-49.976-49.976 22.419-49.976 49.976-49.976zM501.801 245.801H406.2c-4.957-33.988-34.286-60.175-69.626-60.175s-64.669 26.187-69.626 60.175H10.199C4.567 245.801 0 250.367 0 256s4.567 10.199 10.199 10.199h256.749c4.957 33.988 34.286 60.175 69.626 60.175s64.669-26.187 69.626-60.175h95.601c5.632 0 10.199-4.566 10.199-10.199s-4.567-10.199-10.199-10.199zm-165.227 60.175c-27.557 0-49.976-22.419-49.976-49.976s22.419-49.976 49.976-49.976S386.55 228.443 386.55 256s-22.419 49.976-49.976 49.976zM501.801 413.068h-5.1c-5.632 0-10.199 4.566-10.199 10.199s4.567 10.199 10.199 10.199h5.1c5.632 0 10.199-4.566 10.199-10.199s-4.567-10.199-10.199-10.199zM457.944 413.068H255.251c-4.957-33.988-34.286-60.175-69.626-60.175S120.956 379.08 116 413.068H10.2c-5.633 0-10.2 4.566-10.2 10.199s4.567 10.199 10.199 10.199H116c4.957 33.988 34.286 60.175 69.626 60.175s64.669-26.187 69.626-60.175h202.693c5.632 0 10.199-4.566 10.199-10.199s-4.568-10.199-10.2-10.199zm-272.318 60.175c-27.557 0-49.976-22.419-49.976-49.976s22.419-49.976 49.976-49.976 49.976 22.419 49.976 49.976-22.419 49.976-49.976 49.976z" />
  </Svg>
)

export default SvgComponent;