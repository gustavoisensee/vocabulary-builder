import firebase from 'firebase';
import { retrieveData } from '../helpers/asyncStorage';
import lType from '../types/language';

export const saveLanguages = async (languages: Array<lType>): Promise<any> => {
  try {
    const { user } = await retrieveData('account');
    const result = await firebase
      .database()
      .ref(`users/${user.id}/languages`)
      .set(languages);

    return result;
  } catch (err) {
    // TODO add sentry
    return false;
  }
};

export const getLanguages = async (): Promise<any> => {
  try {
    const { user } = await retrieveData('account');
    const data = await firebase
      .database()
      .ref(`users/${user.id}/languages`)
      .once('value');

    return data;
  } catch (err) {
    // TODO add sentry
    return [];
  }
};
