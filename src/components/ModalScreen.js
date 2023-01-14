import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ModalScreen({
  children,
  containerStyle,
  onBackdropPress,
  useInsets = true,
  style
}) {
  const safeArea = useSafeAreaInsets();

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        style={{ flex: 1 }}
        onPress={onBackdropPress}
      />
      <View
        style={[
          style,
          useInsets && { paddingBottom: safeArea.bottom + style.padding }
        ]}
      >
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#00000032",
    justifyContent: "flex-end"
  }
})