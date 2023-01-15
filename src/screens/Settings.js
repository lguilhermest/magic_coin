import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ModalScreen } from "../components";
import * as ImagePicker from 'expo-image-picker';
import { StorageService } from "../services";

export default function Settings({ navigation, route }) {
  const { current } = route.params ?? { current: null }
  async function pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      })
      await StorageService.storeData("background_image", result.assets[0].uri)
      navigation.goBack()
    } catch (error) { }
  };

  const Button = ({ label, onPress, hidden = false }) => (
    <TouchableOpacity
      style={[styles.button, hidden && { display: "none" }]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )

  return (
    <ModalScreen
      style={styles.container}
      onBackdropPress={() => navigation.goBack()}
    >
      <Button
        label={"Moeda"}
        onPress={() => navigation.replace("CoinSelect")}
      />
      <Button
        label={"Imagem de fundo"}
        onPress={pickImage}
      />
      <Button
        hidden={current == "Home"}
        label={"Home"}
        onPress={() => {
          navigation.popToTop();
          navigation.navigate("Home");
        }}
      />
      <Button
        hidden={current == "SendCoin"}
        label={"Send"}
        onPress={() => {
          navigation.popToTop();
          navigation.navigate("SendCoin");
        }}
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