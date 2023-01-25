import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { StorageService } from '../services';
import { HomeButton, Text } from '../components';
import QRCode from 'react-native-qrcode-svg';
import Color from '../Color';

export default function Home({ navigation }) {
  const [pushToken, setPushToken] = useState();

  useEffect(() => {
    initialize();
  }, [])

  async function initialize() {
    const id = await StorageService.getData("push_token");
    setPushToken(id)
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
      {!!pushToken &&
        <View style={{ alignSelf: "center", alignItems: "center", marginVertical: 20 }}>
          <Text bold style={styles.label}>Meu Código</Text>
          <View style={{ backgroundColor: "#fff", borderRadius: 5, padding: 10 }}>
            <QRCode
              size={150}
              value={pushToken}
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