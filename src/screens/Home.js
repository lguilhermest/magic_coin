import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { StorageService } from '../services';
import { useIsFocused } from '@react-navigation/native';
import { AnimatedCoin, Container } from '../components';

const SIZE = 180;

export default function Home({ navigation }) {
  const pan = new Animated.ValueXY();
  const isFocused = useIsFocused();
  const window = useWindowDimensions();
  const [coin, setCoin] = useState(null);
  const [enableShow, setEnableShow] = useState(false);

  useEffect(() => {
    (async () => {
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
    <Container
      onLongPress={() => navigation.navigate("Settings")}
      style={styles.container}
    >
      <AnimatedCoin
        animatedValue={pan}
        image={coin}
        size={SIZE}
        onTouchBordersEnd={() => setEnableShow(true)}
      />
    </Container>
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