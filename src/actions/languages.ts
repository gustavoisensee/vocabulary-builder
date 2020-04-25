import firebase from 'firebase';
import { retrieveData } from '../helpers/asyncStorage';
import { captureException } from '../helpers/sentry';
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
    captureException(err, 'Error when saving languages');
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
    captureException(err, 'Error when getting languages');
    return [];
  }
};
