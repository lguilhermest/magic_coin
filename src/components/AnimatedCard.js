import React from "react";
import { Animated, useWindowDimensions } from "react-native";

export default function AnimatedCard({

}) {

  const { height, width } = useWindowDimensions();
  const cardHeight = height * .8;
  const cardWidth = cardHeight / 2.5

  return (
    <Animated.Image
      source={require("../../assets/cards/card_red_back.png")}
      resizeMode={'contain'}
      style={[
        {
          height: cardHeight,
          width: cardWidth,
        },
      ]}
    />
  )
}