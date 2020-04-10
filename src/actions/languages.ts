import firebase from 'firebase';
import { retrieveData } from '../helpers/asyncStorage';

type languageType = {
  id: string,
  title: string,
  words: Array<any>
};

export const saveLanguages = async(languages: languageType) => {
  try {
    const { user } = await retrieveData('account');
    const result = await firebase.database()
      .ref(`users/${user.id}/languages`)
      .set(languages);

    return result;
  } catch (err) {
    // TODO add sentry
    return false;
  }
};

export const getLanguages = async() => {
  try {
    const { user } = await retrieveData('account');
    const data = await firebase.database()
      .ref(`users/${user.id}/languages`)
      .once('value');

    return data;
  } catch (err) {
    // TODO add sentry
    return [];
  }
};
