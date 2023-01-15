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
import { StorageService } from '../services';

const SIZE = 180;

export default function SendCoin({ navigation }) {
  const pan = new Animated.ValueXY();
  const window = useWindowDimensions();
  const [show, setShow] = useState();

  useEffect(() => {
    resetData();
    const unsub = onSnapshot(doc(firestore, "devices", "test_device"), (doc) => {
      const response = doc.data()
      if (response?.side == "sender") {
        setShow(true);
      }
    });

    return () => unsub();
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
        setShow(false);
      });
    })
  }

  useEffect(() => {
    if (show == true) {
      slideFromTop()
    }
  }, [show])

  async function onThrowEffectEnd({ image }) {
    try {
      await setDoc(doc(firestore, "devices", "test_device"), {
        side: "receiver",
        image
      });
    } catch (e) { }
  }

  async function resetData() {
    await setDoc(doc(firestore, "devices", "test_device"), {
      side: null
    });
  }

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