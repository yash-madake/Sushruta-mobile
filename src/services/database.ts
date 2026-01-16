import AsyncStorage from '@react-native-async-storage/async-storage';

export const DB = {
  // Initialize storage if empty
  init: async () => {
    const users = await AsyncStorage.getItem('users');
    if (!users) {
      await AsyncStorage.setItem('users', JSON.stringify([]));
    }
  },

  // Save data to a key
  save: async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Storage Error", e);
      return false;
    }
  },

  // Retrieve data from a key
  get: async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error parsing storage data", e);
      return null;
    }
  },

  // Clear specific key
  remove: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
  
  // Clear entire DB
  clearAll: async () => {
    await AsyncStorage.clear();
  }
};