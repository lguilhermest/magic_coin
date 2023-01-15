import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import AnimatedCoin from '../components/AnimatedCoin';
import { Container } from '../components';

const SIZE = 180;

export default function SendCoin({ navigation }) {
  const pan = new Animated.ValueXY();
  const window = useWindowDimensions();
  const [show, setShow] = useState();

  function slideFromTop() {
    pan.setValue({
      x: 0,
      y: -window.height
    });
    setTimeout(() => {
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: 0
        },
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setShow(false)
      });
    })
  }

  useEffect(() => {
    if (show) {
      slideFromTop()
    }
  }, [show])

  return (
    <Container
      onLongPress={() => navigation.navigate("Settings", { current: "SendCoin" })}
      style={styles.container}
    >
      <AnimatedCoin
        animatedValue={pan}
        hindOnTouchBorders={false}
        size={SIZE}
        throwEffect
        onThrowEffectEnd={() => setShow(true)}
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