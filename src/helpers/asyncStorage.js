import { AsyncStorage } from 'react-native';

const PREFIX = '@vocabulary-builder';

export const storeData = async(key, value) => {
  try {
    await AsyncStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getData = async(key) => {
  try {
    const value = await AsyncStorage.getItem(`${PREFIX}:${key}`);
    
    if (value) return JSON.parse(value);
    return null;
  } catch(e) {
    // error reading value
    return undefined;
  }
};

export const removeData = async(key) => {
  try {
    await AsyncStorage.removeItem(`${PREFIX}:${key}`);
    
    return null;
  } catch(e) {
    // error removing value
    return undefined;
  }
};
