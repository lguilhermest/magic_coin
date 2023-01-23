import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";
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
        <Icon
          color={props.icon?.color ?? Color.background}
          name={props.icon?.name ?? "close"}
          size={props.icon?.size ?? 35}
        />
      </View>
      <Text
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
    backgroundColor: Color.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1.2 / 1,
    width: "60%",
    marginBottom: 5
  },
  label: {
    flex: 1,
    color: "#000",
    textAlign: "center",
    fontSize: 14,
    width: "80%"
  }
});