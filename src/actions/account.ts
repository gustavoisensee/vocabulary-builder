import * as Google from 'expo-google-app-auth';
import { retrieveData } from '../helpers/asyncStorage';
import { captureException } from '../helpers/sentry';
import googleConfig from '../../config/google.json';

export const login = async (): Promise<any> =>
  Google.logInAsync(googleConfig.signIn);

export const logout = async (): Promise<boolean> => {
  try {
    const { accessToken } = await retrieveData('account');

    await Google.logOutAsync({
      ...googleConfig.signIn,
      accessToken
    });

    return true;
  } catch (err) {
    captureException(err, 'Error on accounts/logout');
    return false;
  }
};
