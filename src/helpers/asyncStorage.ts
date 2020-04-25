import { AsyncStorage } from 'react-native';
import { captureException } from './sentry';

const PREFIX = '@vocabulary-builder';

export const storeData = async (key: string, value: any): Promise<any> => {
  try {
    await AsyncStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
  } catch (err) {
    captureException(err, 'Error on asyncStorage/storeData');
    return Promise.resolve(null);
  }
};

export const retrieveData = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(`${PREFIX}:${key}`);

    if (value) return JSON.parse(value);
    return null;
  } catch (err) {
    captureException(err, 'Error on asyncStorage/retrieveData');
    return undefined;
  }
};

export const removeData = async (key: string): Promise<any> => {
  try {
    await AsyncStorage.removeItem(`${PREFIX}:${key}`);

    return null;
  } catch (err) {
    captureException(err, 'Error on asyncStorage/removeData');
    return undefined;
  }
};
