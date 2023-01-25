import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, Appearance, DeviceEventEmitter, StatusBar } from "react-native";
import { NotificationService, StorageService } from "./src/services";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./src/services/Firebase";
import { renderStack } from "./src/helpers/Navigation";
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_500Medium,
  Nunito_900Black,
  useFonts
} from "@expo-google-fonts/nunito";
import { Home } from "./src/screens";
import CoinScreens from "./src/screens/Coin";
import SettingsScreens, { SettingsModals } from "./src/screens/Settings";
import Color from "./src/Color";
import Typography from "./src/Typography";

const Stack = createNativeStackNavigator();

export default function App() {
  const listener = useRef();

  const renderScreens = renderStack(Stack);
  const [fontsLoaded] = useFonts({
    Nunito_900Black, Nunito_700Bold, Nunito_500Medium, Nunito_400Regular
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();

    listener.current = NotificationService.addListener((notification) => {
      const { data } = notification.request.content;

      console.log(data.type);
      DeviceEventEmitter.emit(data.type, data)
    })

    return () => {
      NotificationService.removeListener(listener.current)
    };
  }, [])

  async function initialize() {
    try {
      const token = await NotificationService.registerToken();
      await StorageService.storeData("push_token", token);
    } catch (error) { }
    setLoading(false)
  }

  if (loading || !fontsLoaded) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={Appearance.getColorScheme() == "dark" ? "dark-content" : "light-content"} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTintColor: Color.background,
          headerTitleStyle: {
            fontFamily: Typography.fontFamily.regular
          },
          headerStyle: { backgroundColor: Color.accent }
        }}
      >
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Selecione um opção",
              headerShown: true
            }}
          />
          {renderScreens(CoinScreens)}
          {renderScreens(SettingsScreens)}
        </Stack.Group>

        <Stack.Group>
          {renderScreens(SettingsModals, true)}
        </Stack.Group>

      </Stack.Navigator>
    </NavigationContainer>
  )
}