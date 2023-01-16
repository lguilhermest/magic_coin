import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ModalScreen } from "../../components";
import { StorageService } from "../../services";

export default function ScreenSelect({ navigation }) {

  const Button = ({ label, onPress, hidden = false }) => (
    <TouchableOpacity
      style={[styles.button, hidden && { display: "none" }]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )

  async function defineScreen(screenName) {
    try {
      await StorageService.storeData("initial_screen", screenName);
      navigation.goBack()
    } catch (error) { }
  }

  return (
    <ModalScreen
      style={styles.container}
      onBackdropPress={() => navigation.goBack()}
    >
      <Button
        label={"Home"}
        onPress={() => defineScreen("Home")}
      />
      <Button
        label={"Sender"}
        onPress={() => defineScreen("SendCoin")}
      />
      <Button
        label={"Receiver"}
        onPress={() => defineScreen("ReceiveCoin")}
      />
    </ModalScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 20
  },
  button: {
    borderColor: "#999",
    borderRadius: 5,
    borderWidth: .5,
    marginBottom: 10,
    padding: 10
  },
  label: {
    fontSize: 15
  }
})