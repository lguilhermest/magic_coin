import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceEventEmitter } from "react-native";
import { expo } from "../../app.json"

class StorageService {
  prefix = expo.name.trim().toUpperCase

  static async storeData(key, value) {
    await AsyncStorage.setItem(key, value)
    DeviceEventEmitter.emit(key, {})
  }

  static async storeObject(key, value) {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
    DeviceEventEmitter.emit(key, {})
  }

  static async getData(key) {
    return await AsyncStorage.getItem(key);
  }

  static async getObject(key) {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  }

  static async removeItem(key) {
    return await AsyncStorage.removeItem(key);
  }

}

export default StorageService;