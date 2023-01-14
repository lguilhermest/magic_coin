import React, { useEffect } from "react";
import { Animated, PanResponder, useWindowDimensions } from "react-native";
import Coins from "../helpers/Coins";

export default function AnimatedCoin({
  image = {},
  refValue,
  onTouchBorders,
  size = 180
}) {
  const half_size = size / 2;
  const pan = new Animated.ValueXY();
  const window = useWindowDimensions();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gesture) => {
      pan.extractOffset();
      if (
        gesture.moveX <= half_size ||
        gesture.moveY <= half_size ||
        gesture.moveX >= (window.width - half_size) ||
        gesture.moveY >= (window.height - half_size)
      ) {
        onTouchBorders(pan, gesture);
      }
    },
  });

  const panStyle = {
    transform: pan.getTranslateTransform(),
  };

  useEffect(() => {
    refValue(pan)
  }, [])

  return (
    <Animated.Image
      source={Coins[image?.image ?? "br_real"][image?.side ?? "front"]}
      resizeMode={'contain'}
      {...panResponder.panHandlers}
      style={[
        {
          height: size,
          width: size,
          borderRadius: size / 2,
        },
        panStyle
      ]}
    />
  )
}