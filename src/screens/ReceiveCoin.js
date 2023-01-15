import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import AnimatedCoin from '../components/AnimatedCoin';
import { Container } from '../components';
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { firestore } from '../services/Firebase';

const SIZE = 180;

export default function ReceiveCoin({ navigation }) {
  const pan = new Animated.ValueXY();
  const window = useWindowDimensions();
  const [image, setImage] = useState()

  useEffect(() => {
    const unsub = onSnapshot(doc(firestore, "devices", "test_device"), (doc) => {
      const response = doc.data()
      if (response?.side == "receiver") {
        setImage(response.image)
      }
    });

    return () => unsub();
  }, [])

  useEffect(() => {
    pan.setValue({
      x: 0,
      y: -window.height
    });
  }, [])

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
        setImage(null)
      });
    })
  }

  useEffect(() => {
    if (!!image) {
      slideFromTop()
    }
  }, [image])

  async function onThrowEffectEnd() {
    try {
      await setDoc(doc(firestore, "devices", "test_device"), {
        side: "sender",
      });
    } catch (e) { }
  }

  return (
    <Container
      onLongPress={() => navigation.navigate("Settings", { current: "ReceiveCoin" })}
      style={styles.container}
    >
      <AnimatedCoin
        customImage={image}
        animatedValue={pan}
        hindOnTouchBorders={false}
        size={SIZE}
        throwEffect
        onThrowEffectEnd={onThrowEffectEnd}
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