import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default class NotificationService {

  static async registerToken() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      throw new Error("Failed to get push token for push notification!");
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    // const token = (await Notifications.getDevicePushTokenAsync()).data;
    return token;
  }

  static addListener(callback) {
    return Notifications.addNotificationReceivedListener(callback);
  }

  static removeListener(listener) {
    return Notifications.removeNotificationSubscription(listener);
  }

  static async send(to, data) {
    return await fetch("https://exp.host/--/api/v2/push/send", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to, data
      })
    })
  }
}