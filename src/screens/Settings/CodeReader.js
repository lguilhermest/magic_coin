import React, { useEffect, useState } from "react";
import { StorageService } from "../../services";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Alert, StyleSheet, Text, View } from "react-native";
import { ModalScreen } from "../../components";

export default function CodeReader({ navigation }) {
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
      setScanned(true);
      await StorageService.storeData("device_connection", data);
      navigation.goBack();
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
    <ModalScreen
      backdrop
      centralize
      onBackdropPress={() => navigation.goBack()}
    >
      <View style={{ borderRadius: 10, aspectRatio: 1 / 1, width: "70%", overflow: "hidden" }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handle}
          style={{ flexGrow: 1 }}
        />
      </View>
    </ModalScreen>
  )
}