import firebase from 'firebase';
import { captureException } from './sentry';
import googleConfig from '../../config/google.json';

export const init = (): void => {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(googleConfig.firebase);
    }
  } catch (err) {
    captureException(err, 'Error when initilize firebase');
  }
};
