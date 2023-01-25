import React, { useEffect, useState } from 'react';
import {
  Animated,
  DeviceEventEmitter,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import AnimatedCoin from '../../components/AnimatedCoin';
import { Container, InfoCard } from '../../components';
import { NotificationService, StorageService } from '../../services';

const SIZE = 180;

export default function SendCoin({ navigation }) {
  const pan = new Animated.ValueXY();
  const window = useWindowDimensions();
  const [show, setShow] = useState();
  const [pushToken, setPushToken] = useState();

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener("create_connection", async ({ token }) => {
      setPushToken(token);
      const push_token = await StorageService.getData("push_token");

      await NotificationService.send(token, {
        type: 'confirm_connection',
        token: push_token
      })
    })

    const coin_listener = DeviceEventEmitter.addListener("sender_show_coin", slideFromTop)

    return () => {
      coin_listener.remove();
      subscription.remove();
    };
  }, []);

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
      await NotificationService.send(pushToken, {
        type: 'receiver_show_coin',
        can_send_back: true,
        image
      })
    } catch (error) { }
  }

  return (
    <Container style={styles.container}>
      <InfoCard
        visible={!pushToken}
        onBackdropPress={() => navigation.goBack()}
        title="Estabelecendo conexão"
        message="É necessário que haja outro dispositivo conectado."
        loading
      />
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