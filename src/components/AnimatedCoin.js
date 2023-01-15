import React from "react";
import { Animated, PanResponder, useWindowDimensions } from "react-native";
import Coins from "../helpers/Coins";

export default function AnimatedCoin({
  image = {},
  onTouchBorders,
  size = 180,
  animatedValue = new Animated.ValueXY(),
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
    onPanResponderRelease: (_, gesture) => {
      animatedValue.extractOffset();
      if (Math.abs(gesture.vx) > 100 || Math.abs(gesture.vy) > 100) {
        keepMoving({
          x: gesture.vx / 10,
          y: gesture.vy / 10
        });
      } else {
        if (gesture.moveX <= half_size) {
          onTouchBorders(animatedValue, gesture, "left");
        } else if (gesture.moveY <= half_size) {
          onTouchBorders(animatedValue, gesture, "top");
        } else if (gesture.moveX >= (window.width - half_size)) {
          onTouchBorders(animatedValue, gesture, "right");
        } else if (gesture.moveX >= (window.width - half_size)) {
          onTouchBorders(animatedValue, gesture, "bottom");
        }
      }
    },
  });

  const keepMoving = (velocity) => {
    Animated.decay(animatedValue, {
      velocity,
      useNativeDriver: true
    }).start(() => {
      animatedValue.extractOffset();
    });
  }

  const panStyle = {
    transform: animatedValue.getTranslateTransform(),
  };

  return (
    <Animated.Image
      source={Coins[image?.image ?? "br_real"][image?.side ?? "front"]}
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