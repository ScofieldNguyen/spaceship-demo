import StorageService from '@/integrations/favoriteRepo/StorageService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AsyncStorageServiceImpl implements StorageService {
  async save(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving data to AsyncStorage', error);
    }
  }

  async load(key: string): Promise<string> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ?? '';
    } catch (error) {
      console.error('Error loading data from AsyncStorage', error);
      return '';
    }
  }
}
