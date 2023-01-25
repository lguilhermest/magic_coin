import React, { useEffect, useState } from 'react';
import {
  Animated,
  DeviceEventEmitter,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import AnimatedCoin from '../../components/AnimatedCoin';
import { Container, InfoCard } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { NotificationService, StorageService } from '../../services';

const SIZE = 180;

export default function ReceiveCoin({ navigation }) {
  const pan = new Animated.ValueXY();
  const window = useWindowDimensions();
  const [image, setImage] = useState();
  const [conected, setConected] = useState(false)
  const [pushToken, setPushToken] = useState(null);

  const isFocused = useIsFocused()

  useEffect(() => {
    initialize();

    const connection = DeviceEventEmitter.addListener("confirm_connection", () => {
      setConected(true);
    })

    const coin_listener = DeviceEventEmitter.addListener("receiver_show_coin", (data) => {
      setImage(data.image);
      slideFromTop();
    })

    return () => {
      connection.remove();
      coin_listener.remove();
    };
  }, [isFocused])

  async function initialize() {
    try {
      const sender_token = await StorageService.getData("device_connection");
      if (!sender_token) {
        return navigation.navigate("CodeReader");
      }
      setPushToken(sender_token);
      const token = await StorageService.getData('push_token');

      await NotificationService.send(sender_token, {
        token,
        type: 'create_connection',
        side: 'receiver'
      })
    } catch (error) {
      console.log("CONNECTION ERROR RECEIVER", error);
    }
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
    pan.setValue({
      x: 0,
      y: -window.height
    })
    if (!!image) {
      slideFromTop()
    }
  }, [image, conected])

  useEffect(() => {
    if (!pushToken) {
      pan.setValue({
        x: 0,
        y: -window.height
      })
    }
  }, [pushToken])

  async function onThrowEffectEnd() {
    try {
      await NotificationService.send(pushToken, {
        type: 'sender_show_coin'
      })
    } catch (e) { }
  }

  return (
    <Container style={styles.container}>
      <InfoCard
        visible={!conected}
        onBackdropPress={() => navigation.goBack()}
        title="Estabelecendo conexão"
        message="É necessário que haja outro dispositivo conectado."
        loading
      />
      {pushToken &&
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