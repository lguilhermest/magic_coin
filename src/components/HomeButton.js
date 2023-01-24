import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SvgComponent, { SvgTypes } from "./svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Color from "../Color";
import Text from "./Text";


type Props = {
  label?: String,
  onPress?: () => void,
  onLongPress?: () => void,
  icon?: {
    name?: String,
    color?: String,
    size?: Number
  },
  svg?: {
    name: SvgTypes,
    size?: String | Number,
    height?: String | Number,
    width?: String | Number
  }
}

export default function HomeButton(props: Props) {
  return (
    <TouchableOpacity
      activeOpacity={.6}
      onLongPress={props.onLongPress}
      onPress={props.onPress}
      style={styles.container}
    >
      <View style={styles.content}>
        {props.svg ?
          <View
            style={{
              height: props.svg.size ?? props.svg.height ?? "80%",
              width: props.svg.size ?? props.svg.width ?? "80%"
            }}
          >
            <SvgComponent
              height={"100%"}
              width={"100%"}
              name={props.svg.name}
            />
          </View>
          :
          <Icon
            color={props.icon?.color ?? Color.accent}
            name={props.icon?.name ?? "close"}
            size={props.icon?.size ?? 35}
          />
        }
      </View>
      <Text
        adjustsFontSizeToFit
        weight="medium"
        numberOfLines={props.label.indexOf(" ") > 0 ? 2 : 1}
        style={styles.label}
      >
        {props.label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "32%"
  },
  content: {
    backgroundColor: Color.outline,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1.2 / 1,
    width: "60%",
    marginBottom: 5
  },
  label: {
    flex: 1,
    color: Color.accent,
    textAlign: "center",
    fontSize: 14,
    width: "80%"
  }
});