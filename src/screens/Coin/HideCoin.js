import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { AnimatedCoin, Container } from '../../components';

const SIZE = 180;

export default function HideCoin({ navigation }) {
  const pan = new Animated.ValueXY();
  const window = useWindowDimensions();
  const [enableShow, setEnableShow] = useState(false);

  useEffect(() => {
    if (enableShow) {
      pan.setValue({
        x: 0,
        y: -window.height
      })
      let enabled = true
      Accelerometer.setUpdateInterval(1000);
      Accelerometer.addListener(({ x, y, z }) => {
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        const sensibility = 2.5;
        if (acceleration >= sensibility && enabled) {
          enabled = false;
          slideFromTop();
        }
      });
    } else {
      Accelerometer.removeAllListeners();
    }
    return () => Accelerometer.removeAllListeners();
  }, [enableShow]);

  function slideFromTop() {
    Animated.timing(pan, {
      toValue: {
        x: 0,
        y: 0
      },
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setEnableShow(false)
    });
  }

  return (
    <Container
      onLongPress={() => navigation.navigate("Settings", { current: "Home" })}
      style={styles.container}
    >
      <AnimatedCoin
        animatedValue={pan}
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