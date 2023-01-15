import React, { useEffect, useState } from "react";
import { Animated, DeviceEventEmitter, PanResponder, useWindowDimensions } from "react-native";
import Coins from "../helpers/Coins";
import { StorageService } from "../services";

export default function AnimatedCoin({
  animatedValue = new Animated.ValueXY(),
  onTouchBorders = () => null,
  onTouchBordersEnd = () => null,
  hindOnTouchBorders = true,
  onThrowEffectEnd = () => null,
  size = 180,
  throwEffect = false,
}) {
  const [image, setImage] = useState({})
  const half_size = size / 2;
  const window = useWindowDimensions();
  const screenWidth = window.width;
  const screenHeight = window.height;

  function keepMovingOnTouchBorders(event, gesture) {
    Animated.decay(animatedValue, {
      velocity: {
        x: gesture.vx,
        y: gesture.vy
      },
      deceleration: 0.997,
      useNativeDriver: true
    }).start(() => {
      onTouchBordersEnd()
    })
  }

  function stopOnGetOutOfScreen() {
    animatedValue.addListener((state) => {
      if (
        state.x < -(screenWidth / 2 + size) ||
        state.x > screenWidth / 2 ||
        state.y < -(screenHeight / 2 + size) ||
        state.y > screenHeight / 2
      ) {
        animatedValue.stopAnimation();
      }
    });
  }

  function throwEffectMovement(event, gesture) {
    stopOnGetOutOfScreen();
    Animated.decay(animatedValue, {
      velocity: {
        x: gesture.vx,
        y: gesture.vy
      },
      useNativeDriver: true
    }).start(() => {
      animatedValue.extractOffset();
      onThrowEffectEnd(event, gesture)
    });
  }

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
        throwEffectMovement(event, gesture);
      } else if (
        gesture.moveX <= half_size ||
        gesture.moveY <= half_size ||
        gesture.moveX >= (window.width - half_size) ||
        gesture.moveY >= (window.height - half_size)
      ) {
        if (hindOnTouchBorders) {
          keepMovingOnTouchBorders(event, gesture);
        }
        onTouchBorders(animatedValue, gesture);
      }
    },
  });

  const panStyle = {
    transform: animatedValue.getTranslateTransform(),
  };

  useEffect(() => {
    const subscriber = DeviceEventEmitter.addListener("coin_image", async () => {
      const res = await StorageService.getObject("coin_image");
      setImage(res);
    })

    DeviceEventEmitter.emit("coin_image", {})

    return () => subscriber.remove();
  }, []);

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