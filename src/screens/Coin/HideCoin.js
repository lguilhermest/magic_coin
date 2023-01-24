import React, { useEffect, useState } from 'react';
import {
  Animated,
  Appearance,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { AnimatedCoin, Container, InfoCard } from '../../components';
import { StorageService } from '../../services';

const SIZE = 180;

const topics = [
  {
    items: [
      { label: "Clique e arraste para movimentar a moeda;" },
      { label: "A moeda desaparecerá quando tocar nas bordas da tela;" },
      { label: "Movimente rapidamente o celuar para fazer a moeda aparecer;" },
      { label: "A moeda surgirá no top e se moverá para o centro em um movimento rápido;" }
    ]
  }
]

export default function HideCoin({ navigation }) {
  const pan = new Animated.ValueXY();
  const window = useWindowDimensions();
  const [showInfo, setShowInfo] = useState(false);
  const [enableShow, setEnableShow] = useState(false);

  useEffect(() => {
    (async () => {
      const visualized = await StorageService.getData("screen_hide_coin");
      if (!visualized) {
        setShowInfo(true);
      }
    })()
  }, [])

  async function onClose() {
    setShowInfo(false);
    StorageService.storeData("screen_hide_coin", 'true');
  }

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
      <StatusBar hidden />
      <InfoCard
        title={"Instruções"}
        topics={topics}
        onBackdropPress={onClose}
        visible={showInfo}
      />
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