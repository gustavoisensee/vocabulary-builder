import { AsyncStorage } from 'react-native';

const PREFIX = '@vocabulary-builder';

export const storeData = async(key, value) => {
  try {
    await AsyncStorage.setItem(`${PREFIX}:${key}`, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async(key) => {
  try {
    const value = await AsyncStorage.getItem(`${PREFIX}:${key}`);
    
    return value;
  } catch(e) {
    // error reading value
  }
};
