import React, { useEffect, useState } from "react";
import { StorageService } from "../../services";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Alert, Platform, StatusBar, StyleSheet, Text, useWindowDimensions, Vibration, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CodeReader({ navigation }) {
  const paddingBottom = Platform.OS == "ios" ? useSafeAreaInsets().bottom + 40 : 0
  const size = useWindowDimensions().width * .6;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);


  async function handle({ type, data }) {
    try {
      Vibration.vibrate([100]);
      setScanned(true);
      await StorageService.storeData("device_connection", data);
      setTimeout(() => navigation.goBack(), 400);
    } catch (error) {
      Alert.alert("Erro", error)
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000", paddingBottom }}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? undefined : handle}
        style={[styles.container]}
      >
        <StatusBar
          backgroundColor={"#000"}
          barStyle={"light-content"}
        />
        <View
          style={{
            borderRadius: 10,
            height: size,
            width: size,
            backgroundColor: "#FFFFFF32"
          }}
        />
      </BarCodeScanner>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})