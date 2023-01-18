import React, { useEffect, useMemo, useState } from 'react';
import {
  Animated,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import AnimatedCoin from '../../components/AnimatedCoin';
import { Container } from '../../components';
import { setDoc, doc, onSnapshot } from "firebase/firestore";
import { firestore } from '../../services/Firebase';
import { useIsFocused } from '@react-navigation/native';
import { StorageService } from '../../services';

const SIZE = 180;

export default function ReceiveCoin({ navigation }) {
  let subscriber = null
  const pan = new Animated.ValueXY();
  const window = useWindowDimensions();
  const [image, setImage] = useState();
  const [deviceId, setDeviceId] = useState(null);

  const isFocused = useIsFocused()

  useEffect(() => {
    initialize();
    return () => {
      if (subscriber) {
        subscriber()
      }
    };
  }, [isFocused])

  async function initialize() {
    try {
      const device_id = await StorageService.getData("device_connection");
      if (device_id) {
        setDeviceId(device_id);
        subscriber = onSnapshot(doc(firestore, "devices", device_id), (doc) => {
          const response = doc.data()
          if (response?.side == "receiver") {
            setImage(response.image)
          }
        });
      } else {
        navigation.navigate("CodeReader");
      }
    } catch (error) { }
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
      }).start();
    })
  }

  useEffect(() => {
    if (!!image) {
      pan.setValue({
        x: 0,
        y: -window.height
      })
      slideFromTop()
    }
  }, [image])

  useEffect(() => {
    if (!deviceId) {
      pan.setValue({
        x: 0,
        y: -window.height
      })
    }
  }, [deviceId])

  async function onThrowEffectEnd() {
    try {
      await setDoc(doc(firestore, "devices", deviceId), {
        side: "sender",
      });
    } catch (e) { }
  }

  return (
    <Container style={styles.container}>
      {deviceId &&
        <AnimatedCoin
          animatedValue={pan}
          customImage={image}
          hindOnTouchBorders={false}
          onThrowEffectEnd={onThrowEffectEnd}
          size={SIZE}
          throwEffect
        />
      }
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