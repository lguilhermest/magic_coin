import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ModalScreen({
  children,
  containerStyle,
  onBackdropPress,
  backdrop,
  centralize,
  useInsets = true,
  style
}) {
  const safeArea = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        centralize && styles.centralize
      ]}
    >
      <Pressable
        style={[styles.backdrop, backdrop && { backgroundColor: "#00000052" }]}
        onPress={onBackdropPress}
      />
      <View
        style={[
          style,
          useInsets && { paddingBottom: safeArea.bottom + (style?.padding ?? 0) }
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
    justifyContent: "flex-end"
  },
  backdrop: {
    position: "absolute",
    ...StyleSheet.absoluteFill
  },
  centralize: {
    alignItems: "center",
    justifyContent: "center"
  }
})