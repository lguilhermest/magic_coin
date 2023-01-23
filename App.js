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
  CodeReader,
  Home,
  ScreenSelect,
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
import CoinScreens from "./src/screens/Coin";
import SettingsScreens, { SettingsModals } from "./src/screens/Settings";

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

  function renderScreens(screens, modal = false) {
    return (
      <>
        {screens.map((screen, i) => {
          const { component, name, options, halfModal } = screen;
          return (
            <Stack.Screen
              key={i}
              name={name}
              component={component}
              options={({ navigation }) => ({
                ...options,
                ...(modal && {
                  headerShown: true,
                  headerTitle: "",
                  headerStyle: {
                    backgroundColor: "#000"
                  },
                  headerBackVisible: false,
                  headerRight: () => <CloseButton navigation={navigation} />
                }),
                ...(halfModal && {
                  presentation: "transparentModal",
                  headerMode: "none",
                  headerRight: null
                })
              })}
            />
          )
        })}
      </>
    )
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
          {/* <Stack.Screen
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
          /> */}
          {renderScreens(SettingsModals, true)}
          <Stack.Screen
            name="ScreenSelect"
            component={ScreenSelect}
            options={{
              header: "none",
              presentation: "transparentModal"
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}