import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, Appearance, StatusBar } from "react-native";
import { StorageService } from "./src/services";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "./src/services/Firebase";
import Color from "./src/Color";
import Typography from "./src/Typography";
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

const Stack = createNativeStackNavigator();

export default function App() {
  const renderScreens = renderStack(Stack);
  const [fontsLoaded] = useFonts({
    Nunito_900Black, Nunito_700Bold, Nunito_500Medium, Nunito_400Regular
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();
  }, [])

  async function initialize() {
    try {
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