import React from "react";
import { PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { AlertService, StorageService } from "../../services";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { fontNormalize, iconSize } from "../../Typography";

export default function Settings({ navigation, route }) {
  const { current } = route.params ?? { current: null }

  async function check() {
    try {
      const hasImage = await StorageService.getData("background_image");
      if (!hasImage) {
        AlertService.confirmAction({
          cancelable: false,
          title: "Atenção",
          message: "A imagem selecionada ficará visível apenas nas telas de truques",
          confirmText: "Ok",
          onConfirmPress: () => pickImage()
        })
      } else {
        pickImage()
      }
    } catch (error) { }
  };

  async function pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      })
      await StorageService.storeData("background_image", result.assets[0].uri);
      DeviceEventEmitter.emit("background_image", {})
    } catch (error) {
      console.log(error);
    }
  }

  const Button = ({ label, onPress, hidden = false }) => (
    <TouchableOpacity
      style={[styles.button, hidden && { display: "none" }]}
      onPress={onPress}
    >
      <Text style={styles.label}>
        {label}
      </Text>
      <Icon
        name="chevron-right"
        size={iconSize.regular}
      />
    </TouchableOpacity>
  )

  return (
    <View
      style={styles.container}
      onBackdropPress={() => navigation.goBack()}
    >
      <Button
        label={"Alterar Moeda"}
        onPress={() => navigation.navigate("CoinSelect")}
      />
      <Button
        label={"Imagem de fundo"}
        onPress={check}
      />
      <Button
        label={"Definir tela inicial"}
        onPress={() => navigation.navigate("ScreenSelect")}
      />
      <Button
        label={"Ler código"}
        onPress={() => navigation.navigate("CodeReader")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#999",
    borderBottomWidth: PixelRatio.roundToNearestPixel(1),
    padding: 10
  },
  label: {
    fontSize: 15
  }
})