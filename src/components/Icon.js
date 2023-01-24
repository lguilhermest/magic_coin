import React from "react";
import { IconProps } from "react-native-vector-icons/Icon";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";

const fonts = {
  'ant-design': AntDesign,
  'entypo': Entypo,
  'evil': EvilIcons,
  'feather': Feather,
  'font-awesome': FontAwesome,
  'fontisto': Fontisto,
  'foundation': Foundation,
  'ionicons': Ionicons,
  'material-community': MaterialCommunityIcons,
  'material': MaterialIcons,
  'simple-line': SimpleLineIcons,
  'zocial': Zocial
}

type Props = IconProps & {
  name: String,
  type: 'ant-design' | 'entypo' | 'evil' | 'feather' | 'font-awesome' | 'fontisto' | 'foundation' | 'ionicons' | 'material-community' | 'material' | 'simple-line' | 'zocial'
}

export default function Icon(props: Props) {
  const Component = fonts[props.type]
  return (
    <Component
      {...props}
      name={props.name}
    />
  )
}