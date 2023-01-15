import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appearance, StatusBar } from "react-native";
import {
  CoinSelect,
  Home,
  ReceiveCoin,
  SendCoin,
  Settings
} from "./src/screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={Appearance.getColorScheme() == "dark" ? "dark-content" : "light-content"} />
      <Stack.Navigator initialRouteName="SendCoin" screenOptions={{ headerShown: false }}>
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