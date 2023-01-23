import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  Appearance,
  StatusBar,
  TouchableOpacity
} from "react-native";
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
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_500Medium,
  Nunito_900Black,
  useFonts
} from "@expo-google-fonts/nunito"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Color from "./src/Color";
import Typography from "./src/Typography";

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
  const [fontsLoaded] = useFonts({
    Nunito_900Black, Nunito_700Bold, Nunito_500Medium, Nunito_400Regular
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();
  }, [])

  async function initialize() {
    try {
      /* await NavigationBar.setBackgroundColorAsync(Color.accent);
      await NavigationBar.setButtonStyleAsync("light"); */
      const device_id = await StorageService.getData("device_id");
      if (!device_id) {
        const { id } = await addDoc(collection(firestore, "devices"), {
          side: null,
          image: null
        });
        await StorageService.storeData("device_id", id);
      }
    } catch (error) {
      console.log("ERRO", error);
    }
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
              title: "Vamos começar",
              headerShown: true
            }}
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
            options={{
              headerShown: true,
              headerTitle: "Selecione uma moeda"
            }}
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