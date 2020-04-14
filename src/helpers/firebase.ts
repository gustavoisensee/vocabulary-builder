import firebase from 'firebase';
import googleConfig from '../../config/google.json';

export const init = async(): Promise<any> => {
  try {
    return firebase.initializeApp(googleConfig.firebase);

  } catch (err) {
    // console.warn('Fire initialize error: ', err);
    // TODO add sentry
    return Promise.resolve(null);
  }
};
