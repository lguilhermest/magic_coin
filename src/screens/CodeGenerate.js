import React, { useEffect, useState } from "react";
import { StorageService } from "../services";
import QRCode from 'react-native-qrcode-svg';
import { ModalScreen } from "../components";
import { View } from "react-native";

export default function CodeGenerate({ navigation }) {
  const [code, setCode] = useState();

  useEffect(() => {
    (async () => {
      const id = await StorageService.getData("device_id")
      console.log(id);
      setCode(id)
    })()
  }, [])

  return (
    <ModalScreen
      backdrop
      centralize
      onBackdropPress={() => navigation.goBack()}
    >
      <View style={{ backgroundColor: "#fff", padding: 10 }}>
        {!!code &&
          <QRCode
            size={150}
            value={code}
          />
        }
      </View>
    </ModalScreen>
  )
}