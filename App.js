import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, Appearance, StatusBar, TouchableOpacity } from "react-native";
import {
  Card,
  CodeReader,
  CoinSelect,
  HideCoin,
  Home,
  ReceiveCoin,
  SendCoin,
} from "./src/screens";
import { StorageService } from "./src/services";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "./src/services/Firebase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();

const CloseButton = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={{ justifyContent: "center", height: "100%", paddingHorizontal: 10 }}
  >
    <Icon
      color={"#FFF"}
      name="close"
      size={25}
    />
  </TouchableOpacity>
)

export default function App() {
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

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={Appearance.getColorScheme() == "dark" ? "dark-content" : "light-content"} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          {/* Card Screens */}
          <Stack.Screen
            name="Card"
            component={Card}
          />
          {/* Coin Screens */}
          <Stack.Screen
            name="HideCoin"
            component={HideCoin}
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
        <Stack.Group>
          <Stack.Screen
            name="CodeReader"
            component={CodeReader}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: "",
              presentation: "fullScreenModal",
              headerStyle: {
                backgroundColor: "#000"
              },
              headerLeft: () => <CloseButton navigation={navigation} />
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}