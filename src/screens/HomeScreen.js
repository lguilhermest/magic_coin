import React, { useEffect, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  useWindowDimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  StatusBar,
  Appearance,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as ImagePicker from 'expo-image-picker';
import { StorageService } from '../services';
import AnimatedCoin from '../components/AnimatedCoin';

const SIZE = 180;

export default function HomeScreen() {
  let pan
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const window = useWindowDimensions();

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
      pan.setValue({
        x: 0,
        y: -(window.height / 2 + SIZE)
      });
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: 0,
        },
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShow(false));
    }
  }, [show]);

  function onTouchBorders(value, gesture) {
    Animated.timing(value, {
      toValue: {
        x: gesture.moveX <= (SIZE / 2) ? -SIZE : window.width + SIZE,
        y: gesture.moveY,
      },
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  const pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })
      .then((result) => {
        StorageService.storeData("background_image", result.assets[0].uri)
        setImage(result.assets[0].uri);
      })
      .catch(() => {

      })
  };

  useEffect(() => {
    (async () => {
      const res = await StorageService.getData("background_image");
      setImage(res)
    })()
  }, [])

  return (
    <TouchableWithoutFeedback onLongPress={() => pickImage()}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.container}
      >
        <AnimatedCoin
          refValue={(ref) => pan = ref}
          size={SIZE}
          onTouchBorders={onTouchBorders}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
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