import React, { useState } from "react";
import { PixelRatio, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "../../components";
import { iconSize } from "../../Typography";

export default function CoinSettings() {
  const [repeat, setRepeat] = useState(true);
  const [sendBack, setSendBack] = useState(true);

  const Button = ({ boolean, onChange, value, label, onPress, hidden = false }) => (
    <TouchableOpacity
      style={[styles.button, hidden && { display: "none" }]}
      onPress={onPress}
    >
      <Text style={styles.label}>
        {label}
      </Text>
      {boolean ?
        <Switch
          onChange={onChange}
          value={value}
        />
        :
        <Icon
          type="material-community"
          name="chevron-right"
          size={iconSize.regular}
        />
      }
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Button
        boolean
        onChange={() => setRepeat(!repeat)}
        label={"Repetir truque"}
        value={repeat}
      />
      <Button
        boolean
        onChange={() => setSendBack(!sendBack)}
        label={"Permitir recebedor reenviar"}
        value={sendBack}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#999",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  label: {
    fontSize: 15
  }
})