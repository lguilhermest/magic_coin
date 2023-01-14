import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { StorageService } from '../services';
import AnimatedCoin from '../components/AnimatedCoin';
import { useIsFocused } from '@react-navigation/native';

const SIZE = 180;

export default function Home({ navigation }) {
  let pan;
  const isFocused = useIsFocused();
  const [image, setImage] = useState(null);
  const [coin, setCoin] = useState(null);
  const [show, setShow] = useState(false);
  const window = useWindowDimensions();

  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const sensibility = 2.5;
      if (acceleration >= sensibility) {
        setShow(true);
      }
    });
    return () => Accelerometer.removeAllListeners();
  }, []);

  useEffect(() => {
    if (show) {
      pan.setValue({
        x: 0,
        y: -(window.height / 2 + SIZE)
      });
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: 0,
        },
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShow(false));
    }
  }, [show]);

  function onTouchBorders(value, gesture) {
    Animated.timing(value, {
      toValue: {
        x: gesture.moveX <= (SIZE / 2) ? -SIZE : window.width + SIZE,
        y: gesture.moveY,
      },
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    (async () => {
      const res_background = await StorageService.getData("background_image");
      setImage(res_background);
      const res_coin = await StorageService.getObject("coin_image");
      setCoin(res_coin)
    })()
  }, [isFocused])

  return (
    <TouchableWithoutFeedback
      onLongPress={() => navigation.navigate("Settings")}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.container}
      >
        <AnimatedCoin
          image={coin}
          refValue={(ref) => pan = ref}
          size={SIZE}
          onTouchBorders={onTouchBorders}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: 'gray',
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
});