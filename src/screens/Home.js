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
import { useIsFocused } from '@react-navigation/native';
import AnimatedCoin from '../components/AnimatedCoin';

const SIZE = 180;

export default function Home({ navigation }) {
  const pan = new Animated.ValueXY();
  const isFocused = useIsFocused();
  const window = useWindowDimensions();
  const [image, setImage] = useState(null);
  const [coin, setCoin] = useState(null);
  const [enableShow, setEnableShow] = useState(false);

  useEffect(() => {
    (async () => {
      const res_background = await StorageService.getData("background_image");
      setImage(res_background);
      const res_coin = await StorageService.getObject("coin_image");
      setCoin(res_coin)
    })()
  }, [isFocused])

  useEffect(() => {
    if (enableShow) {
      pan.setValue({
        x: 0,
        y: -window.height
      })
      Accelerometer.setUpdateInterval(1000);
      Accelerometer.addListener(({ x, y, z }) => {
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        const sensibility = 2.5;
        if (acceleration >= sensibility) {
          slideFromTop();
        }
      });
    } else {
      Accelerometer.removeAllListeners();
    }
    return () => Accelerometer.removeAllListeners();
  }, [enableShow]);

  function onTouchBorders(value, gesture, position) {
    Animated.timing(value, {
      toValue: {
        x: gesture.moveX <= (SIZE / 2) ? -SIZE : window.width + SIZE,
        y: gesture.moveY,
      },
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setEnableShow(true)
    });
  }

  function slideFromTop() {
    setTimeout(() => {
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: 0
        },
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setEnableShow(false)
      });
    })
  }

  return (
    <TouchableWithoutFeedback
      onLongPress={() => navigation.navigate("Settings")}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.container}
      >
        <AnimatedCoin
          animatedValue={pan}
          image={coin}
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
    justifyContent: 'flex-end',
  },
  circle: {
    backgroundColor: 'gray',
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
});