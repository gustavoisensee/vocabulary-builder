import { AsyncStorage } from 'react-native';

const PREFIX = '@vocabulary-builder';

export const storeData = async (key: string, value: any): Promise<any> => {
  try {
    await AsyncStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
  } catch (e) {
    // saving error
    // TODO add sentry
    return Promise.resolve(null);
  }
};

export const retrieveData = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(`${PREFIX}:${key}`);

    if (value) return JSON.parse(value);
    return null;
  } catch (e) {
    // error reading value
    return undefined;
  }
};

export const removeData = async (key: string): Promise<any> => {
  try {
    await AsyncStorage.removeItem(`${PREFIX}:${key}`);

    return null;
  } catch (e) {
    // error removing value
    return undefined;
  }
};
