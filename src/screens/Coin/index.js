import CoinSelect from "./CoinSelect";
import CoinSettings from "./CoinSettings";
import HideCoin from "./HideCoin";
import ReceiveCoin from "./ReceiveCoin";
import SendCoin from "./SendCoin";

const CoinScreens = [
  {
    name: "CoinSelect",
    component: CoinSelect,
    options: {
      headerShown: true,
      headerTitle: "Selecione uma moeda"
    }
  },
  {
    name: "HideCoin",
    component: HideCoin,
  },
  {
    name: "ReceiveCoin",
    component: ReceiveCoin,
  },
  {
    name: "SendCoin",
    component: SendCoin
  },
  {
    name: "CoinSettings",
    component: CoinSettings,
    options: {
      headerShown: true,
      headerTitle: "Ajustes Moeda"
    }
  }
]

export default CoinScreens;