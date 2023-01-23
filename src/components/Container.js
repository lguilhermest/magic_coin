import React, { useEffect, useState } from "react";
import { DeviceEventEmitter, ImageBackground } from "react-native";
import { StorageService } from "../services";
import * as NavigationBar from "expo-navigation-bar";

export default function Container(props) {
  const [image, setImage] = useState();

  useEffect(() => {
    const subscriber = DeviceEventEmitter.addListener("background_image", async () => {
      const res_background = await StorageService.getData("background_image");
      setImage(res_background);
    })
    DeviceEventEmitter.emit("background_image", {});
    changeBar();
    return async () => {
      subscriber.remove();
      await NavigationBar.setPositionAsync("relative")
    };
  }, []);

  async function changeBar() {
    await NavigationBar
      .setPositionAsync("absolute")
      .then(() => { })
      .catch((e) => { console.log("NAV", e); })
  }

  return (
    <ImageBackground
      style={[{ flex: 1 }, props.style]}
      source={{ uri: image }}
      resizeMode="stretch"
    >
      {props.children}
    </ImageBackground>
  )
}