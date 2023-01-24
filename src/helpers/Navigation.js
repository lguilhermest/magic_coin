import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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

export function renderStack(Stack) {
  return (screens, modal = false) => (
    screens.map((screen, i) => {
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
    })
  )
}