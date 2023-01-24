import Settings from "./Settings";
import ScreenSelect from "./ScreenSelect";
import CodeReader from "./CodeReader";

const SettingsScreens = [
  {
    name: "Settings",
    component: Settings,
    options: {
      headerShown: true,
      headerTitle: "Configurações"
    }
  }
];

export const SettingsModals = [
  {
    name: "CodeReader",
    component: CodeReader
  },
  {
    name: "ScreenSelect",
    component: ScreenSelect,
    options: {
      header: "none",
      presentation: "transparentModal"
    }
  }
]

export default SettingsScreens;

