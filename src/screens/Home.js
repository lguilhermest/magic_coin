import React, { useEffect, useState } from 'react';
import {
  Alert,
  DeviceEventEmitter,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { StorageService } from '../services';
import * as ImagePicker from 'expo-image-picker';

export default function Home({ navigation }) {
  const screenWidth = useWindowDimensions().width - 20
  const [deviceId, setDeviceId] = useState();

  useEffect(() => {
    initialize()
  }, [])

  async function initialize() {
    try {
      const id = await StorageService.getData("device_id");
      setDeviceId(String(id))
    } catch (error) {

    }
  }

  const Row = ({ children, label, spread }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.label}>{label}</Text>
        <ScrollView
          bounces={false}
          horizontal
          contentContainerStyle={{ paddingLeft: 20 }}
          showsHorizontalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    )
  }

  const CardButton = ({ label, onPress, onLongPress }) => {
    const height = screenWidth * .18;
    const width = screenWidth * .26;
    return (
      <TouchableOpacity
        activeOpacity={.6}
        onLongPress={onLongPress}
        onPress={onPress}
        style={[
          styles.button,
          { height, width }
        ]}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </TouchableOpacity>
    )
  }

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
  };

  async function removeBackground() {
    await StorageService.removeItem("background_image");
    DeviceEventEmitter.emit("background_image", {});
    Alert.alert("Background removed");
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
      <Row label={"Images"}>
        <CardButton
          label={"Background"}
          onLongPress={removeBackground}
          onPress={() => pickImage()}
        />
        <CardButton
          label={"Coin"}
          onPress={() => navigation.navigate("CoinSelect")}
        />
      </Row>
      <Row label={"Card Screens"}>
        <CardButton
          label={"Card"}
          onPress={() => navigation.navigate("Card")}
        />
      </Row>
      <Row label={"Coin Screens"}>
        <CardButton
          label={"Hide"}
          onPress={() => navigation.navigate("HideCoin")}
        />
        <CardButton
          label={"Send"}
          onPress={() => navigation.navigate("SendCoin")}
        />
        <CardButton
          label={"Receive"}
          onPress={() => navigation.navigate("ReceiveCoin")}
        />
      </Row>
      <Row label={"Connection"}>
        <CardButton
          label={"Read"}
          onPress={() => navigation.navigate("CodeReader")}
        />
      </Row>
      {!!deviceId &&
        <View style={{ alignSelf: "center", alignItems: "center", marginVertical: 20 }}>
          <Text style={styles.label}>Meu Código</Text>
          <View style={{ backgroundColor: "#fff", borderRadius: 5, padding: 10 }}>
            <QRCode
              size={150}
              value={"UP2ADOUxLpGJPA7cMzQJ"}
            />
          </View>
        </View>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  label: {
    fontSize: 16,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  row: {
    marginBottom: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#989898",
    borderRadius: 5,
    justifyContent: "center",
    marginRight: 10,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16
  }
});