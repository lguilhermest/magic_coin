import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CoinSelect, Home, SendCoin, Settings } from "./src/screens";
import { Appearance, StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={Appearance.getColorScheme() == "dark" ? "dark-content" : "light-content"} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
            name="SendCoin"
            component={SendCoin}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              presentation: "transparentModal",
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}