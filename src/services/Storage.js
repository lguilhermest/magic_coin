import AsyncStorage from "@react-native-async-storage/async-storage";
import { expo } from "../../app.json"

class StorageService {
  prefix = expo.name.trim().toUpperCase

  static async storeData(key, value) {
    return await AsyncStorage.setItem(key, value)
  }

  static async storeObject(key, value) {
    const jsonValue = JSON.stringify(value)
    return await AsyncStorage.setItem(key, jsonValue)
  }

  static async getData(key) {
    return await AsyncStorage.getItem(key)
  }

  static async getObject(key) {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  }
}

export default StorageService;