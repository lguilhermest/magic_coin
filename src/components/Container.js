import React, { useEffect, useState } from "react";
import { DeviceEventEmitter, ImageBackground, TouchableWithoutFeedback } from "react-native";
import { StorageService } from "../services";

export default function Container(props) {
  const [image, setImage] = useState();

  useEffect(() => {
    DeviceEventEmitter.addListener("background_image", async () => {
      const res_background = await StorageService.getData("background_image");
      setImage(res_background);
    })

    DeviceEventEmitter.emit("background_image", {})
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}
      onLongPress={props.onLongPress}
    >
      <ImageBackground
        style={props.style}
        source={{ uri: image }}
      >
        {props.children}
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}