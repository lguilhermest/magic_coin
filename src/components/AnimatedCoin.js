import React from "react";
import { Animated, PanResponder, useWindowDimensions } from "react-native";
import Coins from "../helpers/Coins";

export default function AnimatedCoin({
  animatedValue = new Animated.ValueXY(),
  image = {
    name: null,
    side: null
  },
  onTouchBorders = () => null,
  onThrowEffectEnd = () => null,
  size = 180,
  throwEffect = false,
}) {
  const half_size = size / 2;
  const window = useWindowDimensions();
  const screenWidth = window.width
  const screenHeight = window.height

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      animatedValue.setValue({
        x: gesture.dx,
        y: gesture.dy
      })
    },
    onPanResponderRelease: (event, gesture) => {
      animatedValue.extractOffset();
      if (throwEffect && (Math.abs(gesture.vx) > 100 || Math.abs(gesture.vy) > 100)) {
        Animated.decay(animatedValue, {
          velocity: {
            x: gesture.vx / 10,
            y: gesture.vy / 10
          },
          useNativeDriver: true
        }).start(() => {
          animatedValue.extractOffset();
          onThrowEffectEnd(event, gesture)
        });
      } else if (
        gesture.moveX <= half_size ||
        gesture.moveY <= half_size ||
        gesture.moveX >= (window.width - half_size) ||
        gesture.moveY >= (window.height - half_size)
      ) {
        onTouchBorders(animatedValue, gesture);
      }
    },
  });

  const panStyle = {
    transform: animatedValue.getTranslateTransform(),
  };

  return (
    <Animated.Image
      source={Coins[image?.name ?? "br_real"][image?.side ?? "front"]}
      resizeMode={'contain'}
      {...panResponder.panHandlers}
      style={[
        {
          position: "absolute",
          top: screenHeight / 2 - half_size,
          height: size,
          width: size,
          borderRadius: size / 2,
        },
        panStyle
      ]}
    />
  )
}