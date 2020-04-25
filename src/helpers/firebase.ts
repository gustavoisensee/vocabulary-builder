import firebase from 'firebase';
import { captureException } from './sentry';
import googleConfig from '../../config/google.json';

export const init = async (): Promise<any> => {
  try {
    return firebase.initializeApp(googleConfig.firebase);
  } catch (err) {
    captureException(err, 'Error when initilize firebase');

    return Promise.resolve(null);
  }
};
