import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AnimatedCoin from '../components/AnimatedCoin';
import { Container } from '../components';

const SIZE = 180;

export default function SendCoin({ navigation }) {
  const pan = new Animated.ValueXY();
  const isFocused = useIsFocused();
  const window = useWindowDimensions();

  const [coin, setCoin] = useState(null);

  return (
    <TouchableWithoutFeedback onLongPress={() => navigation.navigate("Settings")}>
      <Container style={styles.container}>
        <AnimatedCoin
          animatedValue={pan}
          image={coin}
          size={SIZE}
          throwEffect
        />
      </Container>
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