import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, Appearance, StatusBar } from "react-native";
import {
  CodeGenerate,
  CodeReader,
  CoinSelect,
  Home,
  ReceiveCoin,
  ScreenSelect,
  SendCoin,
  Settings
} from "./src/screens";
import { StorageService } from "./src/services";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "./src/services/Firebase";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState("Home");

  useEffect(() => {
    initialize();
  }, [])

  async function initialize() {
    try {
      const screenName = await StorageService.getData("initial_screen");
      if (screenName) {
        setInitialRouteName(screenName);
      }
      const device_id = await StorageService.getData("device_id");
      if (!device_id) {
        const { id } = await addDoc(collection(firestore, "devices"), {
          side: null,
          image: null
        });
        await StorageService.storeData("device_id", id);
      }
    } catch (error) { }
    setLoading(false)
  }

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={Appearance.getColorScheme() == "dark" ? "dark-content" : "light-content"} />
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="CoinSelect"
            component={CoinSelect}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ReceiveCoin"
            component={ReceiveCoin}
          />
          <Stack.Screen
            name="SendCoin"
            component={SendCoin}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "transparentModal", }}>
          <Stack.Screen
            name="Settings"
            component={Settings}
          />
          <Stack.Screen
            name="ScreenSelect"
            component={ScreenSelect}
          />
          <Stack.Screen
            name="CodeGenerate"
            component={CodeGenerate}
          />
          <Stack.Screen
            name="CodeReader"
            component={CodeReader}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}