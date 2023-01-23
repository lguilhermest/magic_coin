import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { fontFamily, fontSize } from "../typography";

type Props = TextProps & {
  bold?: Boolean,
  color?: String,
  center?: Boolean,
  justify?: Boolean,
  marginBottom?: Boolean | Number,
  weight?: "medium" | "regular" | "black" | "bold",
  size?: "largeTitle" | "title" | "subtitle" | "headline" | "body" | "small" | "footnote",
}

export default function Text(props: Props) {
  return (
    <RNText
      {...props}
      style={[
        {
          color: props.color ?? "#000",
          fontSize: fontSize[props.size ?? "body"],
          fontFamily: fontFamily[props.weight ?? "regular"]
        },
        props.bold && { fontFamily: fontFamily["bold"] },
        props.center && { textAlign: "center" },
        props.justify && { textAlign: "justify" },
        props.marginBottom && { marginBottom: typeof props.marginBottom == "number" ? props.marginBottom : 10 },
        props.style
      ]}
    >
      {props.children}
    </RNText>
  )
}