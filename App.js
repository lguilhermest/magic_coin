import React, { useEffect, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';

const SIZE = 180;
const HALF_SIZE = SIZE / 2;

export default function App() {
  const pan = new Animated.ValueXY();
  const [show, setShow] = useState(false);
  const window = useWindowDimensions();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (event, { moveX, moveY }) => {
      pan.extractOffset();
      if (moveX <= HALF_SIZE) {
        Animated.timing(pan, {
          toValue: {
            x: -SIZE,
            y: moveY,
          },
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else if (moveX >= window.width - HALF_SIZE) {
        Animated.timing(pan, {
          toValue: {
            x: window.width + SIZE,
            y: moveY,
          },
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const panStyle = {
    transform: pan.getTranslateTransform(),
  };

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
      pan.setValue({ x: window.width / 2 - HALF_SIZE, y: -window.height });
      Animated.timing(pan, {
        toValue: {
          x: window.width / 2 - HALF_SIZE,
          y: window.height / 2 - HALF_SIZE,
        },
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShow(false));
    }
  }, [show]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/moeda.png')}
        resizeMode={'contain'}
        {...panResponder.panHandlers}
        style={[styles.circle, panStyle]}
      />
    </View>
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