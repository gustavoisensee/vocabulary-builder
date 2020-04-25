import firebase from 'firebase';
import * as Sentry from '@sentry/react-native';
import googleConfig from '../../config/google.json';

export const init = async (): Promise<any> => {
  try {
    return firebase.initializeApp(googleConfig.firebase);
  } catch (err) {
    Sentry.addBreadcrumb({
      category: 'firebase',
      message: 'Error when initilize firebase',
      level: Sentry.Severity.Info
    });
    Sentry.captureException(err);

    return Promise.resolve(null);
  }
};
