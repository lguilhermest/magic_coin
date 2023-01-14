import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { StorageService } from "../services";
import Coins from "../helpers/Coins";

export default function CoinSelect({ navigation }) {
  async function onSelect(obj) {
    try {
      await StorageService.storeObject("coin_image", obj)
      navigation.goBack()
    } catch (error) {

    }
  }

  const CoinButton = ({ name, image }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onSelect(name)}
    >
      <Image
        resizeMode="contain"
        source={image}
        style={styles.image}
      />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {Object.keys(Coins).map((item, i) =>
        <View key={i} style={styles.row}>
          <CoinButton
            name={{ image: item, side: "front" }}
            image={Coins[item].front}
          />
          <CoinButton
            name={{ image: item, side: "back" }}
            image={Coins[item].back}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20
  },
  button: {
    height: 120,
    width: 120
  },
  image: {
    height: "100%",
    width: "100%"
  }
})