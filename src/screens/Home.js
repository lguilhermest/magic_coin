import React, { useEffect, useState } from 'react';
import {
  DeviceEventEmitter,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View
} from 'react-native';
import { AlertService, StorageService } from '../services';
import { HomeButton, Text } from '../components';
import QRCode from 'react-native-qrcode-svg';
import * as ImagePicker from 'expo-image-picker';
import Color from '../Color';

export default function Home({ navigation }) {
  const [deviceId, setDeviceId] = useState();

  useEffect(() => {
    initialize()
  }, [])

  async function initialize() {
    try {
      const id = await StorageService.getData("device_id");
      setDeviceId(id)
    } catch (error) { }
  }

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

  async function removeBackground() {
    await StorageService.removeItem("background_image");
    DeviceEventEmitter.emit("background_image", {});
    ToastAndroid.show('Imagem removida!', ToastAndroid.SHORT);
  }

  const Card = ({ label, children, fill }) => (
    <View style={styles.card}>
      <Text size='headline' weight='medium' style={styles.cardLabel}>{label}</Text>
      <View style={styles.cardContent}>
        {children}
        {fill && <View style={{ width: "33%" }} />}
      </View>
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Color.accent}
      />
      <Card label={'Truques com moeda'}>
        <HomeButton
          icon={{
            name: "gesture-tap-box"
          }}
          label={"Esconder"}
          onPress={() => navigation.navigate("HideCoin")}
        />
        <HomeButton
          icon={{ name: "gesture-swipe-up" }}
          label={"Enviar"}
          onPress={() => navigation.navigate("SendCoin")}
        />
        <HomeButton
          icon={{ name: "cellphone-arrow-down" }}
          label={"Receber"}
          onPress={() => navigation.navigate("ReceiveCoin")}
        />
      </Card>

      <Card label={'Extras'} fill>
        <HomeButton
          icon={{ name: "tools" }}
          label={"Configurações"}
          onPress={() => navigation.navigate("Settings")}
        />
        <HomeButton
          icon={{ name: "star" }}
          label={"Avalie o App"}
          onPress={() => navigation.navigate("CoinSelect")}
        />
        <HomeButton
          icon={{ name: "share-variant" }}
          label={"Compartilhe"}
          onPress={() => navigation.navigate("CoinSelect")}
        />
      </Card>
      {!!deviceId &&
        <View style={{ alignSelf: "center", alignItems: "center", marginVertical: 20 }}>
          <Text bold style={styles.label}>Meu Código</Text>
          <View style={{ backgroundColor: "#fff", borderRadius: 5, padding: 10 }}>
            <QRCode
              size={150}
              value={deviceId}
            />
          </View>
          <Text center size='footnote' style={{ marginTop: 10, maxWidth: "60%" }}>
            É necessário conectar dois dispositivos para o truque de enviar e receber
          </Text>
        </View>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10
  },
  label: {
    paddingHorizontal: 20,
    marginBottom: 10
  },
  row: {
    marginBottom: 20
  },
  card: {
    marginBottom: 20
  },
  cardLabel: {
    padding: 5
  },
  cardContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 10
  }
});